import { pool } from "../../db";

export class PostgresDataSourceRepository {
  async listByWorkspace(workspaceId: string) {
    const result = await pool.query(
      `SELECT *
       FROM data_sources
       WHERE workspace_id = $1
       ORDER BY created_at DESC`,
      [workspaceId]
    );
    return result.rows;
  }

  async getById(id: string, workspaceId: string) {
    const result = await pool.query(
      `SELECT *
       FROM data_sources
       WHERE id = $1
         AND workspace_id = $2`,
      [id, workspaceId]
    );
    return result.rows[0];
  }

  async create(
    workspaceId: string,
    type: string,
    config: any
  ) {
    const result = await pool.query(
      `INSERT INTO data_sources (workspace_id, type, config)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [workspaceId, type, config]
    );
    return result.rows[0];
  }

  async update(
    id: string,
    workspaceId: string,
    type: string,
    config: any
  ) {
    const result = await pool.query(
      `UPDATE data_sources
       SET type = $3,
           config = $4
       WHERE id = $1
         AND workspace_id = $2
       RETURNING *`,
      [id, workspaceId, type, config]
    );
    return result.rows[0];
  }

  async delete(id: string, workspaceId: string) {
    await pool.query(
      `DELETE FROM data_sources
       WHERE id = $1
         AND workspace_id = $2`,
      [id, workspaceId]
    );
  }
}
