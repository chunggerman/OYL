import { pool } from "../../db";

export class PostgresWorkspaceRepository {
  async list() {
    const result = await pool.query(
      `SELECT * FROM workspaces ORDER BY created_at DESC`
    );
    return result.rows;
  }

  async listByUser(userId: string) {
    const result = await pool.query(
      `SELECT * FROM workspaces WHERE owner_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    return result.rows;
  }

  async create(data: any) {
    const result = await pool.query(
      `INSERT INTO workspaces (name, description)
       VALUES ($1, $2)
       RETURNING *`,
      [data.name, data.description || null]
    );
    return result.rows[0];
  }

  async get(id: string) {
    const result = await pool.query(
      `SELECT * FROM workspaces WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  async update(id: string, data: any) {
    const result = await pool.query(
      `UPDATE workspaces
       SET name = $1,
           description = $2,
           updated_at = NOW()
       WHERE id = $3
       RETURNING *`,
      [data.name, data.description || null, id]
    );
    return result.rows[0];
  }

  async delete(id: string) {
    await pool.query(`DELETE FROM workspaces WHERE id = $1`, [id]);
  }
}
