import { pool } from "../../db";

export class PostgresUserRepository {
  async listByTenant(tenantId: string) {
    const result = await pool.query(
      `SELECT *
       FROM users
       WHERE tenant_id = $1
       ORDER BY created_at DESC`,
      [tenantId]
    );
    return result.rows;
  }

  async getById(id: string, tenantId: string) {
    const result = await pool.query(
      `SELECT *
       FROM users
       WHERE id = $1
         AND tenant_id = $2`,
      [id, tenantId]
    );
    return result.rows[0];
  }

  async getByEmail(email: string, tenantId: string) {
    const result = await pool.query(
      `SELECT *
       FROM users
       WHERE email = $1
         AND tenant_id = $2`,
      [email, tenantId]
    );
    return result.rows[0];
  }

  async create(
    tenantId: string,
    email: string,
    name: string | null
  ) {
    const result = await pool.query(
      `INSERT INTO users (tenant_id, email, name)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [tenantId, email, name]
    );
    return result.rows[0];
  }

  async update(
    id: string,
    tenantId: string,
    email: string,
    name: string | null
  ) {
    const result = await pool.query(
      `UPDATE users
       SET email = $3,
           name = $4
       WHERE id = $1
         AND tenant_id = $2
       RETURNING *`,
      [id, tenantId, email, name]
    );
    return result.rows[0];
  }

  async delete(id: string, tenantId: string) {
    await pool.query(
      `DELETE FROM users
       WHERE id = $1
         AND tenant_id = $2`,
      [id, tenantId]
    );
  }
}
