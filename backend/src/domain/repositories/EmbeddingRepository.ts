import { pool } from "../../db";
import { Embedding } from "../entities/Embedding";

export class EmbeddingRepository {
  async create(params: {
    chunkId: string;
    vector: number[];
  }): Promise<Embedding> {
    const result = await pool.query(
      `
      INSERT INTO embeddings (id, chunk_id, embedding)
      VALUES (gen_random_uuid(), $1, $2)
      RETURNING id, chunk_id, embedding, created_at
      `,
      [params.chunkId, params.vector]
    );

    return {
      id: result.rows[0].id,
      chunkId: result.rows[0].chunk_id,
      vector: result.rows[0].embedding,
      createdAt: result.rows[0].created_at,
    };
  }

  async findByChunkId(chunkId: string): Promise<Embedding | null> {
    const result = await pool.query(
      `
      SELECT id, chunk_id, embedding, created_at
      FROM embeddings
      WHERE chunk_id = $1
      `,
      [chunkId]
    );

    if (result.rowCount === 0) return null;

    return {
      id: result.rows[0].id,
      chunkId: result.rows[0].chunk_id,
      vector: result.rows[0].embedding,
      createdAt: result.rows[0].created_at,
    };
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
}
