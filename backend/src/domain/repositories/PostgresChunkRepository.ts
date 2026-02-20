//backend/src/domain/repositories/PostgresChunkRepository.ts

import { pool } from "../../db";
import {
  Chunk,
  CreateChunkInput,
  UpdateChunkInput,
} from "../entities/Chunk";

export class PostgresChunkRepository {
  private mapRow(row: any): Chunk {
    return {
      id: row.id,
      documentId: row.document_id,
      position: row.position,
      text: row.text,
      length: row.length,
      overlap: row.overlap,
      hash: row.hash,
      metadata: row.metadata,
      createdAt: row.created_at,
      deletedAt: row.deleted_at,
    };
  }

  async listByDocument(documentId: string): Promise<Chunk[]> {
    const result = await pool.query(
      `
      SELECT *
      FROM chunks
      WHERE document_id = $1 AND deleted_at IS NULL
      ORDER BY position ASC
      `,
      [documentId]
    );
    return result.rows.map((r) => this.mapRow(r));
  }

  async create(input: CreateChunkInput): Promise<Chunk> {
    const result = await pool.query(
      `
      INSERT INTO chunks (id, document_id, position, text, length, overlap, hash, metadata)
      VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7)
      RETURNING *
      `,
      [
        input.documentId,
        input.position,
        input.text,
        input.length,
        input.overlap,
        input.hash ?? null,
        input.metadata ?? {},
      ]
    );
    return this.mapRow(result.rows[0]);
  }

  async deleteByDocument(documentId: string): Promise<void> {
    await pool.query(
      `
      UPDATE chunks
      SET deleted_at = NOW()
      WHERE document_id = $1
      `,
      [documentId]
    );
  }
}
