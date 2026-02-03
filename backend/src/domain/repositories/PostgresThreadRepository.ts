import { pool } from "../../db";

export class PostgresThreadRepository {
  async listByWorkspace(workspaceId: string) {
    const result = await pool.query(
      `SELECT *
       FROM threads
       WHERE workspace_id = $1
       ORDER BY updated_at DESC`,
      [workspaceId]
    );
    return result.rows;
  }

  async getById(id: string, workspaceId: string) {
    const result = await pool.query(
      `SELECT *
       FROM threads
       WHERE id = $1
         AND workspace_id = $2`,
      [id, workspaceId]
    );
    return result.rows[0];
  }

  async create(
    workspaceId: string,
    title: string | null
  ) {
    const result = await pool.query(
      `INSERT INTO threads (workspace_id, title)
       VALUES ($1, $2)
       RETURNING *`,
      [workspaceId, title]
    );
    return result.rows[0];
  }

  async updateTitle(
    id: string,
    workspaceId: string,
    title: string | null
  ) {
    const result = await pool.query(
      `UPDATE threads
       SET title = $3,
           updated_at = NOW()
       WHERE id = $1
         AND workspace_id = $2
       RETURNING *`,
      [id, workspaceId, title]
    );
    return result.rows[0];
  }

  async touch(id: string, workspaceId: string) {
    await pool.query(
      `UPDATE threads
       SET updated_at = NOW()
       WHERE id = $1
         AND workspace_id = $2`,
      [id, workspaceId]
    );
  }

  async delete(id: string, workspaceId: string) {
    await pool.query(
      `DELETE FROM threads
       WHERE id = $1
         AND workspace_id = $2`,
      [id, workspaceId]
    );
  }
}
