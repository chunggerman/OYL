import { pool } from "../../db";

export class PostgresTenantRepository {
  async list() {
    const result = await pool.query(
      `SELECT *
       FROM tenants
       ORDER BY created_at DESC`
    );
    return result.rows;
  }

  async getById(id: string) {
    const result = await pool.query(
      `SELECT *
       FROM tenants
       WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  }

  async getByDomain(domain: string) {
    const result = await pool.query(
      `SELECT *
       FROM tenants
       WHERE domain = $1`,
      [domain]
    );
    return result.rows[0];
  }

  async create(name: string, domain: string | null) {
    const result = await pool.query(
      `INSERT INTO tenants (name, domain)
       VALUES ($1, $2)
       RETURNING *`,
      [name, domain]
    );
    return result.rows[0];
  }

  async update(id: string, name: string, domain: string | null) {
    const result = await pool.query(
      `UPDATE tenants
       SET name = $2,
           domain = $3
       WHERE id = $1
       RETURNING *`,
      [id, name, domain]
    );
    return result.rows[0];
  }

  async delete(id: string) {
    await pool.query(
      `DELETE FROM tenants
       WHERE id = $1`,
      [id]
    );
  }
}
