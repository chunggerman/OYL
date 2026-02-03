import { pool } from "../../db";
import { Chunk } from "../entities/Chunk";

export class ChunkRepository {
  async create(params: {
    documentId: string;
    position: number;
    text: string;
    tagsText?: string[] | null;
  }): Promise<Chunk> {
    const result = await pool.query(
      `
      INSERT INTO chunks (id, document_id, position, text, tags_text)
      VALUES (gen_random_uuid(), $1, $2, $3, $4)
      RETURNING id, document_id, position, text, tags_text, created_at, deleted_at
      `,
      [
        params.documentId,
        params.position,
        params.text,
        params.tagsText ?? null,
      ]
    );
    return this.mapRow(result.rows[0]);
  }

  async listByDocument(documentId: string): Promise<Chunk[]> {
    const result = await pool.query(
      `
      SELECT id, document_id, position, text, tags_text, created_at, deleted_at
      FROM chunks
      WHERE document_id = $1 AND deleted_at IS NULL
      ORDER BY position ASC
      `,
      [documentId]
    );
    return result.rows.map((row) => this.mapRow(row));
  }

  async softDeleteByDocument(documentId: string): Promise<void> {
    await pool.query(
      `
      UPDATE chunks
      SET deleted_at = NOW()
      WHERE document_id = $1 AND deleted_at IS NULL
      `,
      [documentId]
    );
  }

  private mapRow(row: any): Chunk {
    return {
      id: row.id,
      documentId: row.document_id,
      position: row.position,
      text: row.text,
      tagsText: row.tags_text,
      createdAt: row.created_at,
      deletedAt: row.deleted_at,
    };
  }
}
