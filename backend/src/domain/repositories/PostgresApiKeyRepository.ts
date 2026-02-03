import { pool } from "../../db";

export class PostgresApiKeyRepository {
  async listByWorkspace(workspaceId: string) {
    const result = await pool.query(
      `SELECT *
       FROM api_keys
       WHERE workspace_id = $1
       ORDER BY created_at DESC`,
      [workspaceId]
    );
    return result.rows;
  }

  async getById(id: string, workspaceId: string) {
    const result = await pool.query(
      `SELECT *
       FROM api_keys
       WHERE id = $1
         AND workspace_id = $2`,
      [id, workspaceId]
    );
    return result.rows[0];
  }

  async getByKey(apiKey: string, workspaceId: string) {
    const result = await pool.query(
      `SELECT *
       FROM api_keys
       WHERE key = $1
         AND workspace_id = $2`,
      [apiKey, workspaceId]
    );
    return result.rows[0];
  }

  async create(
    workspaceId: string,
    name: string,
    key: string
  ) {
    const result = await pool.query(
      `INSERT INTO api_keys (workspace_id, name, key)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [workspaceId, name, key]
    );
    return result.rows[0];
  }

  async delete(id: string, workspaceId: string) {
    await pool.query(
      `DELETE FROM api_keys
       WHERE id = $1
         AND workspace_id = $2`,
      [id, workspaceId]
    );
  }
}
