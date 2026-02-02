import { db } from "../../db";
import { Embedding } from "../entities/Embedding";
import { EmbeddingRepository } from "./EmbeddingRepository";

export class PostgresEmbeddingRepository implements EmbeddingRepository {
  async findById(id: string): Promise<Embedding | null> {
    const result = await db.query(
      `SELECT id, chunk_id, vector_ref, created_at
       FROM embeddings
       WHERE id = $1`,
      [id]
    );
    if (result.rowCount === 0) return null;
    const row = result.rows[0];
    return {
      id: row.id,
      chunkId: row.chunk_id,
      vectorRef: row.vector_ref,
      createdAt: row.created_at,
    };
  }

  async findByChunk(chunkId: string): Promise<Embedding[]> {
    const result = await db.query(
      `SELECT id, chunk_id, vector_ref, created_at
       FROM embeddings
       WHERE chunk_id = $1`,
      [chunkId]
    );
    return result.rows.map((row) => ({
      id: row.id,
      chunkId: row.chunk_id,
      vectorRef: row.vector_ref,
      createdAt: row.created_at,
    }));
  }

  async create(embedding: Embedding): Promise<void> {
    await db.query(
      `INSERT INTO embeddings (id, chunk_id, vector_ref, created_at)
       VALUES ($1, $2, $3, $4)`,
      [
        embedding.id,
        embedding.chunkId,
        embedding.vectorRef,
        embedding.createdAt,
      ]
    );
  }
}
