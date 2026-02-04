import { pool } from "../../db";
import {
  Thread,
  CreateThreadInput,
  UpdateThreadInput,
} from "../entities/Thread";
import { ThreadRepository } from "./ThreadRepository";

export class PostgresThreadRepository implements ThreadRepository {

  /**
   * Private Mappers
   */
  private mapRow(row: any): Thread {
    return {
      id: row.id,
      workspaceId: row.workspace_id,
      title: row.title,
      metadata: row.metadata,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  /**
   * Public Repository Methods
   */
  async listByWorkspace(workspaceId: string): Promise<Thread[]> {
    const result = await pool.query(
      "SELECT * FROM threads WHERE workspace_id = $1 ORDER BY created_at DESC",
      [workspaceId]
    );
    return result.rows.map((r) => this.mapRow(r));
  }

  async create(input: CreateThreadInput): Promise<Thread> {
    const result = await pool.query(
      "INSERT INTO threads (workspace_id, title, metadata) VALUES ($1, $2, $3) RETURNING *",
      [input.workspaceId, input.title, input.metadata ?? null]
    );
    return this.mapRow(result.rows[0]);
  }

  async getById(id: string): Promise<Thread | null> {
    const result = await pool.query(
      "SELECT * FROM threads WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async update(id: string, input: UpdateThreadInput): Promise<Thread | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    // Logic: Dynamically build field list for update
    if (input.title !== undefined) {
      fields.push(`title = $${idx}`);
      values.push(input.title);
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
      UPDATE threads
      SET ${fields.join(", ")}, updated_at = NOW()
      WHERE id = $${idx}
      RETURNING *
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async delete(id: string): Promise<void> {
    await pool.query("DELETE FROM threads WHERE id = $1", [id]);
  }
}
