import { pool } from "../../db";
import {
  Embedding,
  CreateEmbeddingInput,
  UpdateEmbeddingInput,
} from "../entities/Embedding";
import { EmbeddingRepository } from "./EmbeddingRepository";

export class PostgresEmbeddingRepository implements EmbeddingRepository {

  /**
   * Private Mappers
   */
  private mapRow(row: any): Embedding {
    return {
      id: row.id,
      chunkId: row.chunk_id,
      messageId: row.message_id,
      vector: row.vector,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  /**
   * Public Repository Methods
   */
  async listByChunk(chunkId: string): Promise<Embedding[]> {
    const result = await pool.query(
      "SELECT * FROM embeddings WHERE chunk_id = $1 ORDER BY created_at DESC",
      [chunkId]
    );
    return result.rows.map((r) => this.mapRow(r));
  }

  async listByMessage(messageId: string): Promise<Embedding[]> {
    const result = await pool.query(
      "SELECT * FROM embeddings WHERE message_id = $1 ORDER BY created_at DESC",
      [messageId]
    );
    return result.rows.map((r) => this.mapRow(r));
  }

  async create(input: CreateEmbeddingInput): Promise<Embedding> {
    const result = await pool.query(
      "INSERT INTO embeddings (chunk_id, message_id, vector) VALUES ($1, $2, $3) RETURNING *",
      [input.chunkId ?? null, input.messageId ?? null, input.vector]
    );
    return this.mapRow(result.rows[0]);
  }

  async getById(id: string): Promise<Embedding | null> {
    const result = await pool.query(
      "SELECT * FROM embeddings WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async update(id: string, input: UpdateEmbeddingInput): Promise<Embedding | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    // Build dynamic fields for the update query
    if (input.vector !== undefined) {
      fields.push(`vector = $${idx}`);
      values.push(input.vector);
      idx++;
    }

    if (fields.length === 0) {
      return this.getById(id);
    }

    // Add ID to values and target the correct index in the WHERE clause
    values.push(id);

    const query = `
      UPDATE embeddings
      SET ${fields.join(", ")}, updated_at = NOW()
      WHERE id = $${idx}
      RETURNING *
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async delete(id: string): Promise<void> {
    await pool.query("DELETE FROM embeddings WHERE id = $1", [id]);
  }
}
