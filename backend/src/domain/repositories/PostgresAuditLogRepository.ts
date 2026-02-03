import { pool } from "../../db";

export class PostgresAuditLogRepository {
  async listByWorkspace(workspaceId: string) {
    const result = await pool.query(
      `SELECT *
       FROM audit_logs
       WHERE workspace_id = $1
       ORDER BY created_at DESC`,
      [workspaceId]
    );
    return result.rows;
  }

  async create(
    workspaceId: string,
    action: string,
    metadata: any
  ) {
    const result = await pool.query(
      `INSERT INTO audit_logs (workspace_id, action, metadata)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [workspaceId, action, metadata]
    );
    return result.rows[0];
  }

  async deleteByWorkspace(workspaceId: string) {
    await pool.query(
      `DELETE FROM audit_logs
       WHERE workspace_id = $1`,
      [workspaceId]
    );
  }
}
