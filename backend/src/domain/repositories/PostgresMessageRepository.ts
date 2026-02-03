import { pool } from "../../db";

export class PostgresMessageRepository {
  async listByThread(threadId: string, workspaceId: string) {
    const result = await pool.query(
      `SELECT *
       FROM messages
       WHERE thread_id = $1
         AND workspace_id = $2
       ORDER BY created_at ASC`,
      [threadId, workspaceId]
    );
    return result.rows;
  }

  async getById(id: string, workspaceId: string) {
    const result = await pool.query(
      `SELECT *
       FROM messages
       WHERE id = $1
         AND workspace_id = $2`,
      [id, workspaceId]
    );
    return result.rows[0];
  }

  async create(
    workspaceId: string,
    threadId: string,
    role: string,
    content: string
  ) {
    const result = await pool.query(
      `INSERT INTO messages (workspace_id, thread_id, role, content)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [workspaceId, threadId, role, content]
    );
    return result.rows[0];
  }

  async deleteByThread(threadId: string, workspaceId: string) {
    await pool.query(
      `DELETE FROM messages
       WHERE thread_id = $1
         AND workspace_id = $2`,
      [threadId, workspaceId]
    );
  }
}
