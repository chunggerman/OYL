import { pool } from "../../db";
import { Embedding } from "../entities/Embedding";

export class EmbeddingRepository {
  async create(params: {
    chunkId: string;
    vectorRef: string;
  }): Promise<Embedding> {
    const result = await pool.query(
      `
      INSERT INTO embeddings (id, chunk_id, vector_ref)
      VALUES (gen_random_uuid(), $1, $2)
      RETURNING id, chunk_id, vector_ref, created_at
      `,
      [params.chunkId, params.vectorRef]
    );
    return this.mapRow(result.rows[0]);
  }

  async findByChunkId(chunkId: string): Promise<Embedding | null> {
    const result = await pool.query(
      `
      SELECT id, chunk_id, vector_ref, created_at
      FROM embeddings
      WHERE chunk_id = $1
      `,
      [chunkId]
    );
    if (result.rowCount === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async deleteByChunkId(chunkId: string): Promise<void> {
    await pool.query(
      `
      DELETE FROM embeddings
      WHERE chunk_id = $1
      `,
      [chunkId]
    );
  }

  private mapRow(row: any): Embedding {
    return {
      id: row.id,
      chunkId: row.chunk_id,
      vectorRef: row.vector_ref,
      createdAt: row.created_at,
    };
  }
}
