import { db } from "../../db";
import { Chunk } from "../entities/Chunk";
import { ChunkRepository } from "./ChunkRepository";

export class PostgresChunkRepository implements ChunkRepository {
  async findById(id: string): Promise<Chunk | null> {
    const result = await db.query(
      `SELECT id, document_id, position, text, tags_text, created_at, deleted_at
       FROM chunks
       WHERE id = $1`,
      [id]
    );
    if (result.rowCount === 0) return null;
    const row = result.rows[0];
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

  async findByDocument(documentId: string): Promise<Chunk[]> {
    const result = await db.query(
      `SELECT id, document_id, position, text, tags_text, created_at, deleted_at
       FROM chunks
       WHERE document_id = $1 AND deleted_at IS NULL
       ORDER BY position ASC`,
      [documentId]
    );
    return result.rows.map((row) => ({
      id: row.id,
      documentId: row.document_id,
      position: row.position,
      text: row.text,
      tagsText: row.tags_text,
      createdAt: row.created_at,
      deletedAt: row.deleted_at,
    }));
  }

  async create(chunk: Chunk): Promise<void> {
    await db.query(
      `INSERT INTO chunks (id, document_id, position, text, tags_text, created_at, deleted_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        chunk.id,
        chunk.documentId,
        chunk.position,
        chunk.text,
        chunk.tagsText,
        chunk.createdAt,
        chunk.deletedAt,
      ]
    );
  }
}
