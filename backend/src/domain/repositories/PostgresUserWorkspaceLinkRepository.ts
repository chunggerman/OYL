import { pool } from "../../db";

export class PostgresUserWorkspaceLinkRepository {
  async listByUser(userId: string, tenantId: string) {
    const result = await pool.query(
      `SELECT *
       FROM user_workspace_links
       WHERE user_id = $1
         AND tenant_id = $2
       ORDER BY created_at DESC`,
      [userId, tenantId]
    );
    return result.rows;
  }

  async listByWorkspace(workspaceId: string, tenantId: string) {
    const result = await pool.query(
      `SELECT *
       FROM user_workspace_links
       WHERE workspace_id = $1
         AND tenant_id = $2
       ORDER BY created_at DESC`,
      [workspaceId, tenantId]
    );
    return result.rows;
  }

  async get(userId: string, workspaceId: string, tenantId: string) {
    const result = await pool.query(
      `SELECT *
       FROM user_workspace_links
       WHERE user_id = $1
         AND workspace_id = $2
         AND tenant_id = $3`,
      [userId, workspaceId, tenantId]
    );
    return result.rows[0];
  }

  async create(
    userId: string,
    workspaceId: string,
    tenantId: string,
    role: string
  ) {
    const result = await pool.query(
      `INSERT INTO user_workspace_links (user_id, workspace_id, tenant_id, role)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userId, workspaceId, tenantId, role]
    );
    return result.rows[0];
  }

  async updateRole(
    userId: string,
    workspaceId: string,
    tenantId: string,
    role: string
  ) {
    const result = await pool.query(
      `UPDATE user_workspace_links
       SET role = $4
       WHERE user_id = $1
         AND workspace_id = $2
         AND tenant_id = $3
       RETURNING *`,
      [userId, workspaceId, tenantId, role]
    );
    return result.rows[0];
  }

  async delete(userId: string, workspaceId: string, tenantId: string) {
    await pool.query(
      `DELETE FROM user_workspace_links
       WHERE user_id = $1
         AND workspace_id = $2
         AND tenant_id = $3`,
      [userId, workspaceId, tenantId]
    );
  }
}
