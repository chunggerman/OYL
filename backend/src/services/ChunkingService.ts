// backend/src/services/ChunkingService.ts

import { pool } from "../db";
import { splitTextIntoChunks } from "../domain/entities/ChunkSplitter";
import { PostgresChunkRepository } from "../domain/repositories/PostgresChunkRepository";

export class ChunkingService {
  private chunkRepo: PostgresChunkRepository;

  constructor(chunkRepo: PostgresChunkRepository) {
    this.chunkRepo = chunkRepo;
  }

  async getDocumentText(documentId: string): Promise<string | null> {
    const result = await pool.query(
      `
      SELECT content
      FROM documents
      WHERE id = $1
      `,
      [documentId]
    );

    if (result.rows.length === 0) return null;
    return result.rows[0].content || "";
  }

  async hasChunks(documentId: string): Promise<boolean> {
    const result = await pool.query(
      `
      SELECT 1
      FROM chunks
      WHERE document_id = $1
      AND deleted_at IS NULL
      LIMIT 1
      `,
      [documentId]
    );
    return result.rows.length > 0;
  }

  async deleteChunks(documentId: string): Promise<void> {
    await this.chunkRepo.deleteByDocument(documentId);
  }

  async chunkDocument(documentId: string) {
    const text = await this.getDocumentText(documentId);
    if (text === null) throw new Error("DOCUMENT_NOT_FOUND");
    if (text.trim().length === 0) throw new Error("DOCUMENT_EMPTY");

    const already = await this.hasChunks(documentId);
    if (already) throw new Error("ALREADY_CHUNKED");

    const rawChunks = splitTextIntoChunks(text);

    for (const raw of rawChunks) {
      await this.chunkRepo.create({
        documentId,
        position: raw.position,
        text: raw.text,
        length: raw.length,
        overlap: raw.overlap,
        hash: raw.hash,
        metadata: raw.metadata,
      });
    }

    return rawChunks.length;
  }
}
