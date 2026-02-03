import { pool } from "../../db";

export class PostgresReferenceRepository {
  async listByDocument(documentId: string, workspaceId: string) {
    const result = await pool.query(
      `SELECT *
       FROM references
       WHERE document_id = $1
         AND workspace_id = $2
       ORDER BY created_at ASC`,
      [documentId, workspaceId]
    );
    return result.rows;
  }

  async create(
    workspaceId: string,
    documentId: string,
    chunkId: string,
    reference: string
  ) {
    const result = await pool.query(
      `INSERT INTO references (workspace_id, document_id, chunk_id, reference)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [workspaceId, documentId, chunkId, reference]
    );
    return result.rows[0];
  }

  async deleteByDocument(documentId: string, workspaceId: string) {
    await pool.query(
      `DELETE FROM references
       WHERE document_id = $1
         AND workspace_id = $2`,
      [documentId, workspaceId]
    );
  }
}
