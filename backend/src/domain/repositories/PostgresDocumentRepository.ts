import { pool } from "../../db";

export class PostgresDocumentRepository {
  async getById(id: string, workspaceId: string) {
    const result = await pool.query(
      `SELECT * FROM documents
       WHERE id = $1 AND workspace_id = $2`,
      [id, workspaceId]
    );
    return result.rows[0];
  }

  async list(workspaceId: string) {
    const result = await pool.query(
      `SELECT * FROM documents
       WHERE workspace_id = $1
       ORDER BY created_at DESC`,
      [workspaceId]
    );
    return result.rows;
  }

  async create(workspaceId: string, title: string) {
    const result = await pool.query(
      `INSERT INTO documents (workspace_id, title)
       VALUES ($1, $2)
       RETURNING *`,
      [workspaceId, title]
    );
    return result.rows[0];
  }

  async delete(id: string, workspaceId: string) {
    await pool.query(
      `DELETE FROM documents
       WHERE id = $1 AND workspace_id = $2`,
      [id, workspaceId]
    );
  }
}
