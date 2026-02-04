import { pool } from "../../db";
import {
  Assistant,
  CreateAssistantInput,
  UpdateAssistantInput,
} from "../../domain/entities/Assistant";
import { AssistantRepository } from "./AssistantRepository";

export class PostgresAssistantRepository implements AssistantRepository {

  /**
   * Private Mappers
   */
  private mapRow(row: any): Assistant {
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  /**
   * Public Repository Methods
   */
  async list(): Promise<Assistant[]> {
    const result = await pool.query(
      "SELECT * FROM assistants ORDER BY created_at DESC"
    );
    return result.rows.map((r) => this.mapRow(r));
  }

  async create(input: CreateAssistantInput): Promise<Assistant> {
    const result = await pool.query(
      "INSERT INTO assistants (name, description) VALUES ($1, $2) RETURNING *",
      [input.name, input.description ?? null]
    );
    return this.mapRow(result.rows[0]);
  }

  async getById(id: string): Promise<Assistant | null> {
    const result = await pool.query(
      "SELECT * FROM assistants WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async update(id: string, input: UpdateAssistantInput): Promise<Assistant | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    // Build dynamic fields
    if (input.name !== undefined) {
      fields.push(`name = $${idx}`);
      values.push(input.name);
      idx++;
    }

    if (input.description !== undefined) {
      fields.push(`description = $${idx}`);
      values.push(input.description);
      idx++;
    }

    if (fields.length === 0) {
      return this.getById(id);
    }

    // Add ID as the final parameter
    values.push(id);

    const query = `
      UPDATE assistants
      SET ${fields.join(", ")}, updated_at = NOW()
      WHERE id = $${idx}
      RETURNING *
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async delete(id: string): Promise<void> {
    await pool.query("DELETE FROM assistants WHERE id = $1", [id]);
  }
}
