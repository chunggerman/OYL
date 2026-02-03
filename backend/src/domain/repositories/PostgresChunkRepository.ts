import { pool } from "../../db";

export class PostgresChunkRepository {
  async getById(id: string, workspaceId: string) {
    const result = await pool.query(
      `SELECT * FROM chunks
       WHERE id = $1 AND workspace_id = $2`,
      [id, workspaceId]
    );
    return result.rows[0];
  }

  async listByDocument(documentId: string, workspaceId: string) {
    const result = await pool.query(
      `SELECT * FROM chunks
       WHERE document_id = $1 AND workspace_id = $2
       ORDER BY index ASC`,
      [documentId, workspaceId]
    );
    return result.rows;
  }

  async create(
    workspaceId: string,
    documentId: string,
    index: number,
    text: string
  ) {
    const result = await pool.query(
      `INSERT INTO chunks (workspace_id, document_id, index, text)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [workspaceId, documentId, index, text]
    );
    return result.rows[0];
  }

  async deleteByDocument(documentId: string, workspaceId: string) {
    await pool.query(
      `DELETE FROM chunks
       WHERE document_id = $1 AND workspace_id = $2`,
      [documentId, workspaceId]
    );
  }
}
