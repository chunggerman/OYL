import { pool } from "../../db";
import {
  Config,
  CreateConfigInput,
  UpdateConfigInput,
} from "../entities/Config";
import { ConfigRepository } from "./ConfigRepository";

export class PostgresConfigRepository implements ConfigRepository {

  /**
   * Private Mappers
   */
  private mapRow(row: any): Config {
    return {
      id: row.id,
      workspaceId: row.workspace_id,
      key: row.key,
      value: row.value,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  /**
   * Public Repository Methods
   */
  async listByWorkspace(workspaceId: string): Promise<Config[]> {
    const result = await pool.query(
      "SELECT * FROM configs WHERE workspace_id = $1 ORDER BY created_at DESC",
      [workspaceId]
    );
    return result.rows.map((r) => this.mapRow(r));
  }

  async create(input: CreateConfigInput): Promise<Config> {
    const result = await pool.query(
      "INSERT INTO configs (workspace_id, key, value) VALUES ($1, $2, $3) RETURNING *",
      [input.workspaceId, input.key, input.value]
    );
    return this.mapRow(result.rows[0]);
  }

  async getById(id: string): Promise<Config | null> {
    const result = await pool.query(
      "SELECT * FROM configs WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async update(id: string, input: UpdateConfigInput): Promise<Config | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    // Build dynamic fields for update
    if (input.key !== undefined) {
      fields.push(`key = $${idx}`);
      values.push(input.key);
      idx++;
    }

    if (input.value !== undefined) {
      fields.push(`value = $${idx}`);
      values.push(input.value);
      idx++;
    }

    if (fields.length === 0) {
      return this.getById(id);
    }

    // Add ID to values and target the correct index in the WHERE clause
    values.push(id);

    const query = `
      UPDATE configs
      SET ${fields.join(", ")}, updated_at = NOW()
      WHERE id = $${idx}
      RETURNING *
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async delete(id: string): Promise<void> {
    await pool.query("DELETE FROM configs WHERE id = $1", [id]);
  }
}
