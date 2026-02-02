import { db } from "../../db";
import { Tag } from "../entities/Tag";
import { TagRepository } from "./TagRepository";

export class PostgresTagRepository implements TagRepository {
  async findById(id: string): Promise<Tag | null> {
    const result = await db.query(
      `SELECT id, reference_id, tag, source, created_at
       FROM tags
       WHERE id = $1`,
      [id]
    );
    if (result.rowCount === 0) return null;
    const row = result.rows[0];
    return {
      id: row.id,
      referenceId: row.reference_id,
      tag: row.tag,
      source: row.source,
      createdAt: row.created_at,
    };
  }

  async findByReference(referenceId: string): Promise<Tag[]> {
    const result = await db.query(
      `SELECT id, reference_id, tag, source, created_at
       FROM tags
       WHERE reference_id = $1`,
      [referenceId]
    );
    return result.rows.map((row) => ({
      id: row.id,
      referenceId: row.reference_id,
      tag: row.tag,
      source: row.source,
      createdAt: row.created_at,
    }));
  }

  async create(tag: Tag): Promise<void> {
    await db.query(
      `INSERT INTO tags (id, reference_id, tag, source, created_at)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        tag.id,
        tag.referenceId,
        tag.tag,
        tag.source,
        tag.createdAt,
      ]
    );
  }
}
