import { pool } from "../../db";

export class PostgresValidationRepository {
  async listByChunk(chunkId: string, workspaceId: string) {
    const result = await pool.query(
      `SELECT *
       FROM validations
       WHERE chunk_id = $1
         AND workspace_id = $2
       ORDER BY created_at DESC`,
      [chunkId, workspaceId]
    );
    return result.rows;
  }

  async getById(id: string, workspaceId: string) {
    const result = await pool.query(
      `SELECT *
       FROM validations
       WHERE id = $1
         AND workspace_id = $2`,
      [id, workspaceId]
    );
    return result.rows[0];
  }

  async create(
    workspaceId: string,
    chunkId: string,
    status: string,
    notes: string | null
  ) {
    const result = await pool.query(
      `INSERT INTO validations (workspace_id, chunk_id, status, notes)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [workspaceId, chunkId, status, notes]
    );
    return result.rows[0];
  }

  async update(
    id: string,
    workspaceId: string,
    status: string,
    notes: string | null
  ) {
    const result = await pool.query(
      `UPDATE validations
       SET status = $3,
           notes = $4
       WHERE id = $1
         AND workspace_id = $2
       RETURNING *`,
      [id, workspaceId, status, notes]
    );
    return result.rows[0];
  }

  async delete(id: string, workspaceId: string) {
    await pool.query(
      `DELETE FROM validations
       WHERE id = $1
         AND workspace_id = $2`,
      [id, workspaceId]
    );
  }
}
