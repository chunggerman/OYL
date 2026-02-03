import { pool } from "../../db";
import { Document } from "../entities/Document";

export class DocumentRepository {
  async create(params: {
    workspaceId: string;
    referenceId?: string | null;
    title: string;
    content?: string | null;
  }): Promise<Document> {
    const result = await pool.query(
      `
      INSERT INTO documents (id, workspace_id, reference_id, title, content)
      VALUES (gen_random_uuid(), $1, $2, $3, $4)
      RETURNING id, workspace_id, reference_id, title, content, created_at, updated_at, deleted_at
      `,
      [
        params.workspaceId,
        params.referenceId ?? null,
        params.title,
        params.content ?? null,
      ]
    );
    return this.mapRow(result.rows[0]);
  }

  async findById(id: string): Promise<Document | null> {
    const result = await pool.query(
      `
      SELECT id, workspace_id, reference_id, title, content, created_at, updated_at, deleted_at
      FROM documents
      WHERE id = $1 AND deleted_at IS NULL
      `,
      [id]
    );
    if (result.rowCount === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async listByWorkspace(workspaceId: string): Promise<Document[]> {
    const result = await pool.query(
      `
      SELECT id, workspace_id, reference_id, title, content, created_at, updated_at, deleted_at
      FROM documents
      WHERE workspace_id = $1 AND deleted_at IS NULL
      ORDER BY created_at DESC
      `,
      [workspaceId]
    );
    return result.rows.map((row) => this.mapRow(row));
  }

  async softDelete(id: string): Promise<void> {
    await pool.query(
      `
      UPDATE documents
      SET deleted_at = NOW()
      WHERE id = $1 AND deleted_at IS NULL
      `,
      [id]
    );
  }

  private mapRow(row: any): Document {
    return {
      id: row.id,
      workspaceId: row.workspace_id,
      referenceId: row.reference_id,
      title: row.title,
      content: row.content,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      deletedAt: row.deleted_at,
    };
  }
}
