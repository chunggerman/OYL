import { pool } from "../../db";
import {
  Integration,
  CreateIntegrationInput,
  UpdateIntegrationInput,
} from "../entities/Integration";
import { IntegrationRepository } from "./IntegrationRepository";

export class PostgresIntegrationRepository implements IntegrationRepository {

  /**
   * Private Mappers
   */
  private mapRow(row: any): Integration {
    return {
      id: row.id,
      workspaceId: row.workspace_id,
      provider: row.provider,
      config: row.config,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  /**
   * Public Repository Methods
   */
  async listByWorkspace(workspaceId: string): Promise<Integration[]> {
    const result = await pool.query(
      "SELECT * FROM integrations WHERE workspace_id = $1 ORDER BY created_at DESC",
      [workspaceId]
    );
    return result.rows.map((r) => this.mapRow(r));
  }

  async create(input: CreateIntegrationInput): Promise<Integration> {
    const result = await pool.query(
      "INSERT INTO integrations (workspace_id, provider, config, status) VALUES ($1, $2, $3, 'active') RETURNING *",
      [input.workspaceId, input.provider, input.config ?? null]
    );
    return this.mapRow(result.rows[0]);
  }

  async getById(id: string): Promise<Integration | null> {
    const result = await pool.query(
      "SELECT * FROM integrations WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async update(id: string, input: UpdateIntegrationInput): Promise<Integration | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    // Logic: Dynamically build fields for the update
    if (input.provider !== undefined) {
      fields.push(`provider = $${idx}`);
      values.push(input.provider);
      idx++;
    }

    if (input.config !== undefined) {
      fields.push(`config = $${idx}`);
      values.push(input.config);
      idx++;
    }

    if (input.status !== undefined) {
      fields.push(`status = $${idx}`);
      values.push(input.status);
      idx++;
    }

    if (fields.length === 0) {
      return this.getById(id);
    }

    // Add ID to values for the WHERE clause
    values.push(id);

    const query = `
      UPDATE integrations
      SET ${fields.join(", ")}, updated_at = NOW()
      WHERE id = $${idx}
      RETURNING *
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async delete(id: string): Promise<void> {
    await pool.query("DELETE FROM integrations WHERE id = $1", [id]);
  }
}
