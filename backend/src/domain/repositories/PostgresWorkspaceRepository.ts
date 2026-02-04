import { pool } from "../../db";
import {
  Workspace,
  CreateWorkspaceInput,
  UpdateWorkspaceInput,
} from "../entities/Workspace";
import { WorkspaceRepository } from "./WorkspaceRepository";

export class PostgresWorkspaceRepository implements WorkspaceRepository {

  /**
   * Private Mappers
   */
  private mapRow(row: any): Workspace {
    return {
      id: row.id,
      ownerId: row.owner_id,
      name: row.name,
      metadata: row.metadata,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  /**
   * Public Repository Methods
   */
  async listByUser(userId: string): Promise<Workspace[]> {
    const result = await pool.query(
      "SELECT * FROM workspaces WHERE owner_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    return result.rows.map((r) => this.mapRow(r));
  }

  async create(input: CreateWorkspaceInput): Promise<Workspace> {
    const result = await pool.query(
      "INSERT INTO workspaces (owner_id, name, metadata) VALUES ($1, $2, $3) RETURNING *",
      [input.ownerId, input.name, input.metadata ?? null]
    );
    return this.mapRow(result.rows[0]);
  }

  async getById(id: string): Promise<Workspace | null> {
    const result = await pool.query(
      "SELECT * FROM workspaces WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async update(id: string, input: UpdateWorkspaceInput): Promise<Workspace | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    // Logic: Dynamically build field list for update
    if (input.name !== undefined) {
      fields.push(`name = $${idx}`);
      values.push(input.name);
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
      UPDATE workspaces
      SET ${fields.join(", ")}, updated_at = NOW()
      WHERE id = $${idx}
      RETURNING *
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async delete(id: string): Promise<void> {
    await pool.query("DELETE FROM workspaces WHERE id = $1", [id]);
  }
}
