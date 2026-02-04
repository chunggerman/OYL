import { pool } from "../../db";
import {
  Tag,
  CreateTagInput,
  UpdateTagInput,
} from "../entities/Tag";
import { TagRepository } from "./TagRepository";

export class PostgresTagRepository implements TagRepository {

  /**
   * Private Mappers
   */
  private mapRow(row: any): Tag {
    return {
      id: row.id,
      workspaceId: row.workspace_id,
      name: row.name,
      color: row.color,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  /**
   * Public Repository Methods
   */
  async listByWorkspace(workspaceId: string): Promise<Tag[]> {
    const result = await pool.query(
      "SELECT * FROM tags WHERE workspace_id = $1 ORDER BY created_at DESC",
      [workspaceId]
    );
    return result.rows.map((r) => this.mapRow(r));
  }

  async create(input: CreateTagInput): Promise<Tag> {
    const result = await pool.query(
      "INSERT INTO tags (workspace_id, name, color) VALUES ($1, $2, $3) RETURNING *",
      [input.workspaceId, input.name, input.color ?? null]
    );
    return this.mapRow(result.rows[0]);
  }

  async getById(id: string): Promise<Tag | null> {
    const result = await pool.query(
      "SELECT * FROM tags WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async update(id: string, input: UpdateTagInput): Promise<Tag | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    // Logic: Dynamically build field list for update
    if (input.name !== undefined) {
      fields.push(`name = $${idx}`);
      values.push(input.name);
      idx++;
    }

    if (input.color !== undefined) {
      fields.push(`color = $${idx}`);
      values.push(input.color);
      idx++;
    }

    if (fields.length === 0) {
      return this.getById(id);
    }

    // Add ID as the final parameter for the WHERE clause
    values.push(id);

    const query = `
      UPDATE tags
      SET ${fields.join(", ")}, updated_at = NOW()
      WHERE id = $${idx}
      RETURNING *
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async delete(id: string): Promise<void> {
    await pool.query("DELETE FROM tags WHERE id = $1", [id]);
  }
}
