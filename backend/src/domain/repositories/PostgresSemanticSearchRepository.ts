import { pool } from "../../db";
import {
  SemanticSearch,
  CreateSemanticSearchInput,
  UpdateSemanticSearchInput,
} from "../entities/SemanticSearch";
import { SemanticSearchRepository } from "./SemanticSearchRepository";

export class PostgresSemanticSearchRepository implements SemanticSearchRepository {

  /**
   * Private Mappers
   */
  private mapRow(row: any): SemanticSearch {
    return {
      id: row.id,
      query: row.query,
      embedding: row.embedding,
      topK: row.top_k,
      retrievedChunkIds: row.retrieved_chunk_ids,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  /**
   * Public Repository Methods
   */
  async list(): Promise<SemanticSearch[]> {
    const result = await pool.query(
      "SELECT * FROM semantic_search ORDER BY created_at DESC"
    );
    return result.rows.map((r) => this.mapRow(r));
  }

  async create(input: CreateSemanticSearchInput): Promise<SemanticSearch> {
    const result = await pool.query(
      "INSERT INTO semantic_search (query, embedding, top_k, retrieved_chunk_ids) VALUES ($1, $2, $3, $4) RETURNING *",
      [input.query, input.embedding, input.topK, input.retrievedChunkIds]
    );
    return this.mapRow(result.rows[0]);
  }

  async getById(id: string): Promise<SemanticSearch | null> {
    const result = await pool.query(
      "SELECT * FROM semantic_search WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async update(id: string, input: UpdateSemanticSearchInput): Promise<SemanticSearch | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    // Build dynamic fields for update
    if (input.topK !== undefined) {
      fields.push(`top_k = $${idx}`);
      values.push(input.topK);
      idx++;
    }

    if (input.retrievedChunkIds !== undefined) {
      fields.push(`retrieved_chunk_ids = $${idx}`);
      values.push(input.retrievedChunkIds);
      idx++;
    }

    if (fields.length === 0) {
      return this.getById(id);
    }

    // Add ID to values and target the correct index in the WHERE clause
    values.push(id);

    const query = `
      UPDATE semantic_search
      SET ${fields.join(", ")}, updated_at = NOW()
      WHERE id = $${idx}
      RETURNING *
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async delete(id: string): Promise<void> {
    await pool.query("DELETE FROM semantic_search WHERE id = $1", [id]);
  }
}
