import { pool } from "../../db";

export class PostgresTagRepository {
  async list(workspaceId: string) {
    const result = await pool.query(
      `SELECT *
       FROM tags
       WHERE workspace_id = $1
       ORDER BY tag ASC`,
      [workspaceId]
    );
    return result.rows;
  }

  async getByName(tag: string, workspaceId: string) {
    const result = await pool.query(
      `SELECT *
       FROM tags
       WHERE tag = $1
         AND workspace_id = $2`,
      [tag, workspaceId]
    );
    return result.rows[0];
  }

  async create(workspaceId: string, tag: string) {
    const result = await pool.query(
      `INSERT INTO tags (workspace_id, tag)
       VALUES ($1, $2)
       RETURNING *`,
      [workspaceId, tag]
    );
    return result.rows[0];
  }

  async delete(tag: string, workspaceId: string) {
    await pool.query(
      `DELETE FROM tags
       WHERE tag = $1
         AND workspace_id = $2`,
      [tag, workspaceId]
    );
  }
}
