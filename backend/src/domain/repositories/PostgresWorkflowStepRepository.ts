import { pool } from "../../db";

export class PostgresWorkflowStepRepository {
  async listByWorkflow(workflowId: string, workspaceId: string) {
    const result = await pool.query(
      `SELECT *
       FROM workflow_steps
       WHERE workflow_id = $1
         AND workspace_id = $2
       ORDER BY position ASC`,
      [workflowId, workspaceId]
    );
    return result.rows;
  }

  async getById(id: string, workspaceId: string) {
    const result = await pool.query(
      `SELECT *
       FROM workflow_steps
       WHERE id = $1
         AND workspace_id = $2`,
      [id, workspaceId]
    );
    return result.rows[0];
  }

  async create(
    workspaceId: string,
    workflowId: string,
    position: number,
    type: string,
    config: any
  ) {
    const result = await pool.query(
      `INSERT INTO workflow_steps (workspace_id, workflow_id, position, type, config)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [workspaceId, workflowId, position, type, config]
    );
    return result.rows[0];
  }

  async update(
    id: string,
    workspaceId: string,
    position: number,
    type: string,
    config: any
  ) {
    const result = await pool.query(
      `UPDATE workflow_steps
       SET position = $3,
           type = $4,
           config = $5
       WHERE id = $1
         AND workspace_id = $2
       RETURNING *`,
      [id, workspaceId, position, type, config]
    );
    return result.rows[0];
  }

  async delete(id: string, workspaceId: string) {
    await pool.query(
      `DELETE FROM workflow_steps
       WHERE id = $1
         AND workspace_id = $2`,
      [id, workspaceId]
    );
  }
}
