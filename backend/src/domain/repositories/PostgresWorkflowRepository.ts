import { pool } from "../../db";

export class PostgresWorkflowRepository {
  async listByWorkspace(workspaceId: string) {
    const result = await pool.query(
      `SELECT *
       FROM workflows
       WHERE workspace_id = $1
       ORDER BY created_at DESC`,
      [workspaceId]
    );
    return result.rows;
  }

  async getById(id: string, workspaceId: string) {
    const result = await pool.query(
      `SELECT *
       FROM workflows
       WHERE id = $1
         AND workspace_id = $2`,
      [id, workspaceId]
    );
    return result.rows[0];
  }

  async create(
    workspaceId: string,
    name: string,
    description: string | null
  ) {
    const result = await pool.query(
      `INSERT INTO workflows (workspace_id, name, description)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [workspaceId, name, description]
    );
    return result.rows[0];
  }

  async update(
    id: string,
    workspaceId: string,
    name: string,
    description: string | null
  ) {
    const result = await pool.query(
      `UPDATE workflows
       SET name = $3,
           description = $4
       WHERE id = $1
         AND workspace_id = $2
       RETURNING *`,
      [id, workspaceId, name, description]
    );
    return result.rows[0];
  }

  async delete(id: string, workspaceId: string) {
    await pool.query(
      `DELETE FROM workflows
       WHERE id = $1
         AND workspace_id = $2`,
      [id, workspaceId]
    );
  }
}
