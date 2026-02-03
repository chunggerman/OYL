import { pool } from "../../db";

export class PostgresIntegrationConfigRepository {
  async listByWorkspace(workspaceId: string) {
    const result = await pool.query(
      `SELECT *
       FROM integration_configs
       WHERE workspace_id = $1
       ORDER BY created_at DESC`,
      [workspaceId]
    );
    return result.rows;
  }

  async getById(id: string, workspaceId: string) {
    const result = await pool.query(
      `SELECT *
       FROM integration_configs
       WHERE id = $1
         AND workspace_id = $2`,
      [id, workspaceId]
    );
    return result.rows[0];
  }

  async create(
    workspaceId: string,
    provider: string,
    config: any
  ) {
    const result = await pool.query(
      `INSERT INTO integration_configs (workspace_id, provider, config)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [workspaceId, provider, config]
    );
    return result.rows[0];
  }

  async update(
    id: string,
    workspaceId: string,
    provider: string,
    config: any
  ) {
    const result = await pool.query(
      `UPDATE integration_configs
       SET provider = $3,
           config = $4
       WHERE id = $1
         AND workspace_id = $2
       RETURNING *`,
      [id, workspaceId, provider, config]
    );
    return result.rows[0];
  }

  async delete(id: string, workspaceId: string) {
    await pool.query(
      `DELETE FROM integration_configs
       WHERE id = $1
         AND workspace_id = $2`,
      [id, workspaceId]
    );
  }
}
