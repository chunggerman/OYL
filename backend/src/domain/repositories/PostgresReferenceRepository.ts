import { pool } from "../../db";
import {
  Reference,
  CreateReferenceInput,
  UpdateReferenceInput,
} from "../entities/Reference";
import { ReferenceRepository } from "./ReferenceRepository";

export class PostgresReferenceRepository implements ReferenceRepository {

  /**
   * Private Mappers
   */
  private mapRow(row: any): Reference {
    return {
      id: row.id,
      chunkId: row.chunk_id,
      sourceType: row.source_type,
      sourceValue: row.source_value,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  /**
   * Public Repository Methods
   */
  async listByChunk(chunkId: string): Promise<Reference[]> {
    const result = await pool.query(
      "SELECT * FROM references WHERE chunk_id = $1 ORDER BY created_at DESC",
      [chunkId]
    );
    return result.rows.map((r) => this.mapRow(r));
  }

  async create(input: CreateReferenceInput): Promise<Reference> {
    const result = await pool.query(
      "INSERT INTO references (chunk_id, source_type, source_value) VALUES ($1, $2, $3) RETURNING *",
      [input.chunkId, input.sourceType, input.sourceValue]
    );
    return this.mapRow(result.rows[0]);
  }

  async getById(id: string): Promise<Reference | null> {
    const result = await pool.query(
      "SELECT * FROM references WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async update(id: string, input: UpdateReferenceInput): Promise<Reference | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    // Dynamically build fields for the update query
    if (input.sourceType !== undefined) {
      fields.push(`source_type = $${idx}`);
      values.push(input.sourceType);
      idx++;
    }

    if (input.sourceValue !== undefined) {
      fields.push(`source_value = $${idx}`);
      values.push(input.sourceValue);
      idx++;
    }

    if (fields.length === 0) {
      return this.getById(id);
    }

    // Add ID to values and target the correct index in the WHERE clause
    values.push(id);

    const query = `
      UPDATE references
      SET ${fields.join(", ")}, updated_at = NOW()
      WHERE id = $${idx}
      RETURNING *
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async delete(id: string): Promise<void> {
    await pool.query("DELETE FROM references WHERE id = $1", [id]);
  }
}
