import { db } from "../../db";
import { TagLink } from "../entities/TagLink";
import { TagLinkRepository } from "./TagLinkRepository";

export class PostgresTagLinkRepository implements TagLinkRepository {
  async findById(id: string): Promise<TagLink | null> {
    const result = await db.query(
      `SELECT id, tag_id, chunk_id, created_at
       FROM tag_links
       WHERE id = $1`,
      [id]
    );
    if (result.rowCount === 0) return null;
    const row = result.rows[0];
    return {
      id: row.id,
      tagId: row.tag_id,
      chunkId: row.chunk_id,
      createdAt: row.created_at,
    };
  }

  async findByChunk(chunkId: string): Promise<TagLink[]> {
    const result = await db.query(
      `SELECT id, tag_id, chunk_id, created_at
       FROM tag_links
       WHERE chunk_id = $1`,
      [chunkId]
    );
    return result.rows.map((row) => ({
      id: row.id,
      tagId: row.tag_id,
      chunkId: row.chunk_id,
      createdAt: row.created_at,
    }));
  }

  async create(tagLink: TagLink): Promise<void> {
    await db.query(
      `INSERT INTO tag_links (id, tag_id, chunk_id, created_at)
       VALUES ($1, $2, $3, $4)`,
      [
        tagLink.id,
        tagLink.tagId,
        tagLink.chunkId,
        tagLink.createdAt,
      ]
    );
  }
}
