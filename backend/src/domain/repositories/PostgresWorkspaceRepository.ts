import { pool } from "../../db";

export class PostgresWorkspaceRepository {
  async listByTenant(tenantId: string) {
    const result = await pool.query(
      `SELECT *
       FROM workspaces
       WHERE tenant_id = $1
       ORDER BY created_at DESC`,
      [tenantId]
    );
    return result.rows;
  }

  async getById(id: string, tenantId: string) {
    const result = await pool.query(
      `SELECT *
       FROM workspaces
       WHERE id = $1
         AND tenant_id = $2`,
      [id, tenantId]
    );
    return result.rows[0];
  }

  async create(
    tenantId: string,
    name: string,
    description: string | null
  ) {
    const result = await pool.query(
      `INSERT INTO workspaces (tenant_id, name, description)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [tenantId, name, description]
    );
    return result.rows[0];
  }

  async update(
    id: string,
    tenantId: string,
    name: string,
    description: string | null
  ) {
    const result = await pool.query(
      `UPDATE workspaces
       SET name = $3,
           description = $4
       WHERE id = $1
         AND tenant_id = $2
       RETURNING *`,
      [id, tenantId, name, description]
    );
    return result.rows[0];
  }

  async delete(id: string, tenantId: string) {
    await pool.query(
      `DELETE FROM workspaces
       WHERE id = $1
         AND tenant_id = $2`,
      [id, tenantId]
    );
  }
}
