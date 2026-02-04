import { pool } from "../../db";
import { ChunkTag } from "../entities/ChunkTag";

export class ChunkTagRepository {
  async addTagToChunk(params: {
    chunkId: string;
    tagId: string;
  }): Promise<ChunkTag> {
    const result = await pool.query(
      `
      INSERT INTO chunk_tags (chunk_id, tag_id)
      VALUES ($1, $2)
      ON CONFLICT (chunk_id, tag_id) DO NOTHING
      RETURNING id, chunk_id, tag_id, created_at
      `,
      [params.chunkId, params.tagId]
    );

    if (result.rowCount === 0) {
      const existing = await pool.query(
        `
        SELECT id, chunk_id, tag_id, created_at
        FROM chunk_tags
        WHERE chunk_id = $1 AND tag_id = $2
        `,
        [params.chunkId, params.tagId]
      );
      const row = existing.rows[0];
      return {
        id: row.id,
        chunkId: row.chunk_id,
        tagId: row.tag_id,
        createdAt: row.created_at,
      };
    }

    const row = result.rows[0];
    return {
      id: row.id,
      chunkId: row.chunk_id,
      tagId: row.tag_id,
      createdAt: row.created_at,
    };
  }

  async listTagsForChunk(chunkId: string): Promise<string[]> {
    const result = await pool.query(
      `
      SELECT t.name
      FROM chunk_tags ct
      JOIN tags t ON t.id = ct.tag_id
      WHERE ct.chunk_id = $1
      ORDER BY t.name ASC
      `,
      [chunkId]
    );

    return result.rows.map((r) => r.name);
  }
}
