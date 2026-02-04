import { Pool } from "pg";

export class PostgresUserRepository {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }

  async list(tenantId: string) {
    const result = await this.pool.query(
      `SELECT id, email, name FROM users WHERE tenant_id = $1`,
      [tenantId]
    );
    return result.rows;
  }

  async get(id: string, tenantId: string) {
    const result = await this.pool.query(
      `SELECT id, email, name FROM users WHERE id = $1 AND tenant_id = $2`,
      [id, tenantId]
    );
    return result.rows[0] || null;
  }

  async create(email: string, name: string | null, tenantId: string) {
    const result = await this.pool.query(
      `INSERT INTO users (email, name, tenant_id)
       VALUES ($1, $2, $3)
       RETURNING id, email, name`,
      [email, name, tenantId]
    );
    return result.rows[0];
  }

  async update(id: string, email: string, name: string | null, tenantId: string) {
    const result = await this.pool.query(
      `UPDATE users
       SET email = $1, name = $2
       WHERE id = $3 AND tenant_id = $4
       RETURNING id, email, name`,
      [email, name, id, tenantId]
    );
    return result.rows[0];
  }

  async delete(id: string, tenantId: string) {
    await this.pool.query(
      `DELETE FROM users WHERE id = $1 AND tenant_id = $2`,
      [id, tenantId]
    );
  }
}
