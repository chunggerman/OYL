import { pool } from "../../db";
import { Tag } from "../entities/Tag";

export class TagRepository {
  async create(params: {
    workspaceId: string;
    name: string;
    description?: string | null;
  }): Promise<Tag> {
    const result = await pool.query(
      `
      INSERT INTO tags (workspace_id, name, description)
      VALUES ($1, $2, $3)
      RETURNING id, workspace_id, name, description, created_at
      `,
      [params.workspaceId, params.name, params.description ?? null]
    );

    const row = result.rows[0];
    return {
      id: row.id,
      workspaceId: row.workspace_id,
      name: row.name,
      description: row.description,
      createdAt: row.created_at,
    };
  }

  async listByWorkspace(workspaceId: string): Promise<Tag[]> {
    const result = await pool.query(
      `
      SELECT id, workspace_id, name, description, created_at
      FROM tags
      WHERE workspace_id = $1
      ORDER BY name ASC
      `,
      [workspaceId]
    );

    return result.rows.map((row) => ({
      id: row.id,
      workspaceId: row.workspace_id,
      name: row.name,
      description: row.description,
      createdAt: row.created_at,
    }));
  }

  async findByName(workspaceId: string, name: string): Promise<Tag | null> {
    const result = await pool.query(
      `
      SELECT id, workspace_id, name, description, created_at
      FROM tags
      WHERE workspace_id = $1 AND name = $2
      `,
      [workspaceId, name]
    );

    if (result.rowCount === 0) return null;

    const row = result.rows[0];
    return {
      id: row.id,
      workspaceId: row.workspace_id,
      name: row.name,
      description: row.description,
      createdAt: row.created_at,
    };
  }
}
