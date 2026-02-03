import { pool } from "../../db";

export class PostgresTagLinkRepository {
  async listByChunk(chunkId: string, workspaceId: string) {
    const result = await pool.query(
      `SELECT *
       FROM chunk_tags
       WHERE chunk_id = $1
         AND workspace_id = $2
       ORDER BY confidence DESC`,
      [chunkId, workspaceId]
    );
    return result.rows;
  }

  async listByTag(tag: string, workspaceId: string) {
    const result = await pool.query(
      `SELECT *
       FROM chunk_tags
       WHERE tag = $1
         AND workspace_id = $2
       ORDER BY confidence DESC`,
      [tag, workspaceId]
    );
    return result.rows;
  }

  async create(
    workspaceId: string,
    chunkId: string,
    tag: string,
    confidence: number
  ) {
    const result = await pool.query(
      `INSERT INTO chunk_tags (workspace_id, chunk_id, tag, confidence)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [workspaceId, chunkId, tag, confidence]
    );
    return result.rows[0];
  }

  async deleteByChunk(chunkId: string, workspaceId: string) {
    await pool.query(
      `DELETE FROM chunk_tags
       WHERE chunk_id = $1
         AND workspace_id = $2`,
      [chunkId, workspaceId]
    );
  }
}
