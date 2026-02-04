import { pool } from "../../db";
import {
  Chunk,
  CreateChunkInput,
  UpdateChunkInput,
} from "../entities/Chunk";
import { ChunkRepository } from "./ChunkRepository";

export class PostgresChunkRepository implements ChunkRepository {

  /**
   * Private Mappers
   */
  private mapRow(row: any): Chunk {
    return {
      id: row.id,
      datasourceId: row.datasource_id,
      content: row.content,
      embedding: row.embedding,
      metadata: row.metadata,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  /**
   * Public Repository Methods
   */
  async listByDatasource(datasourceId: string): Promise<Chunk[]> {
    const result = await pool.query(
      "SELECT * FROM chunks WHERE datasource_id = $1 ORDER BY created_at DESC",
      [datasourceId]
    );
    return result.rows.map((r) => this.mapRow(r));
  }

  async create(input: CreateChunkInput): Promise<Chunk> {
    const result = await pool.query(
      "INSERT INTO chunks (datasource_id, content, embedding, metadata) VALUES ($1, $2, $3, $4) RETURNING *",
      [
        input.datasourceId,
        input.content,
        input.embedding,
        input.metadata ?? null,
      ]
    );
    return this.mapRow(result.rows[0]);
  }

  async getById(id: string): Promise<Chunk | null> {
    const result = await pool.query(
      "SELECT * FROM chunks WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async update(id: string, input: UpdateChunkInput): Promise<Chunk | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    // Logic: Dynamically build field list for update
    if (input.content !== undefined) {
      fields.push(`content = $${idx}`);
      values.push(input.content);
      idx++;
    }

    if (input.embedding !== undefined) {
      fields.push(`embedding = $${idx}`);
      values.push(input.embedding);
      idx++;
    }

    if (input.metadata !== undefined) {
      fields.push(`metadata = $${idx}`);
      values.push(input.metadata);
      idx++;
    }

    if (fields.length === 0) {
      return this.getById(id);
    }

    // Add ID as the final parameter for the WHERE clause
    values.push(id);

    const query = `
      UPDATE chunks
      SET ${fields.join(", ")}, updated_at = NOW()
      WHERE id = $${idx}
      RETURNING *
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async delete(id: string): Promise<void> {
    await pool.query("DELETE FROM chunks WHERE id = $1", [id]);
  }
}
