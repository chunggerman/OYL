import { pool } from "../../db";

export interface EmbeddingSearchResultRow {
  id: string;
  chunk_id: string;
  score: number;
}

export class PostgresEmbeddingRepository {
  async listByChunk(chunkId: string, workspaceId: string) {
    const result = await pool.query(
      `SELECT *
       FROM embeddings
       WHERE chunk_id = $1
         AND workspace_id = $2
       ORDER BY created_at ASC`,
      [chunkId, workspaceId]
    );
    return result.rows;
  }

  async getById(id: string, workspaceId: string) {
    const result = await pool.query(
      `SELECT *
       FROM embeddings
       WHERE id = $1
         AND workspace_id = $2`,
      [id, workspaceId]
    );
    return result.rows[0];
  }

  async create(
    workspaceId: string,
    chunkId: string,
    vector: number[],
    model: string
  ) {
    const result = await pool.query(
      `INSERT INTO embeddings (workspace_id, chunk_id, vector, model)
       VALUES ($1, $2, $3::vector, $4)
       RETURNING *`,
      [workspaceId, chunkId, vector, model]
    );
    return result.rows[0];
  }

  async deleteByChunk(chunkId: string, workspaceId: string) {
    await pool.query(
      `DELETE FROM embeddings
       WHERE chunk_id = $1
         AND workspace_id = $2`,
      [chunkId, workspaceId]
    );
  }

  async search(
    workspaceId: string,
    queryVector: number[],
    topK: number,
    model?: string | null
  ): Promise<{ id: string; chunkId: string; score: number }[]> {
    const result = await pool.query<EmbeddingSearchResultRow>(
      `SELECT
         id,
         chunk_id,
         1 - (vector <-> $1::vector) AS score
       FROM embeddings
       WHERE workspace_id = $2
         AND ($3::text IS NULL OR model = $3)
       ORDER BY vector <-> $1::vector
       LIMIT $4`,
      [queryVector, workspaceId, model ?? null, topK]
    );

    return result.rows.map((row) => ({
      id: row.id,
      chunkId: row.chunk_id,
      score: row.score,
    }));
  }
}
