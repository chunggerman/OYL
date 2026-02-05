import { pool } from "../../db";

export class PostgresDocumentsourceRepository {
  async list() {
    const result = await pool.query(
      "SELECT * FROM document_sources ORDER BY created_at DESC"
    );
    return result.rows;
  }

  async create(data: any) {
    const result = await pool.query(
      `INSERT INTO document_sources (name, type, config)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [data.name, data.type, data.config ?? null]
    );
    return result.rows[0];
  }

  async get(id: string) {
    const result = await pool.query(
      "SELECT * FROM document_sources WHERE id = $1",
      [id]
    );
    return result.rows[0] || null;
  }

  async update(id: string, data: any) {
    const result = await pool.query(
      `UPDATE document_sources
       SET name = $1,
           type = $2,
           config = $3,
           updated_at = NOW()
       WHERE id = $4
       RETURNING *`,
      [data.name, data.type, data.config ?? null, id]
    );
    return result.rows[0] || null;
  }

  async delete(id: string) {
    await pool.query("DELETE FROM document_sources WHERE id = $1", [id]);
  }
}
