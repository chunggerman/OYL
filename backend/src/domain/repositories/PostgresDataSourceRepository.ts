import { pool } from "../../db";
import {
  Datasource,
  CreateDatasourceInput,
  UpdateDatasourceInput,
} from "../entities/Datasource";
import { DatasourceRepository } from "./DatasourceRepository";

export class PostgresDatasourceRepository implements DatasourceRepository {

  /**
   * Private Mappers
   */
  private mapRow(row: any): Datasource {
    return {
      id: row.id,
      workspaceId: row.workspace_id,
      name: row.name,
      type: row.type,
      config: row.config,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  /**
   * Public Repository Methods
   */
  async listByWorkspace(workspaceId: string): Promise<Datasource[]> {
    const result = await pool.query(
      "SELECT * FROM datasources WHERE workspace_id = $1 ORDER BY created_at DESC",
      [workspaceId]
    );
    return result.rows.map((r) => this.mapRow(r));
  }

  async create(input: CreateDatasourceInput): Promise<Datasource> {
    const result = await pool.query(
      "INSERT INTO datasources (workspace_id, name, type, config) VALUES ($1, $2, $3, $4) RETURNING *",
      [input.workspaceId, input.name, input.type, input.config ?? null]
    );
    return this.mapRow(result.rows[0]);
  }

  async getById(id: string): Promise<Datasource | null> {
    const result = await pool.query(
      "SELECT * FROM datasources WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async update(id: string, input: UpdateDatasourceInput): Promise<Datasource | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    // Build dynamic fields for the update query
    if (input.name !== undefined) {
      fields.push(`name = $${idx}`);
      values.push(input.name);
      idx++;
    }

    if (input.type !== undefined) {
      fields.push(`type = $${idx}`);
      values.push(input.type);
      idx++;
    }

    if (input.config !== undefined) {
      fields.push(`config = $${idx}`);
      values.push(input.config);
      idx++;
    }

    if (fields.length === 0) {
      return this.getById(id);
    }

    // Add ID to values and target the correct index in the WHERE clause
    values.push(id);

    const query = `
      UPDATE datasources
      SET ${fields.join(", ")}, updated_at = NOW()
      WHERE id = $${idx}
      RETURNING *
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async delete(id: string): Promise<void> {
    await pool.query("DELETE FROM datasources WHERE id = $1", [id]);
  }
}
