import { pool } from "../db";

export class RagSearchService {
  async search(params: {
    workspaceId: string;
    queryEmbedding: number[];
    tags?: string[];
    topK?: number;
  }) {
    const topK = params.topK ?? 8;

    const tagFilter =
      params.tags && params.tags.length > 0
        ? `
          AND c.id IN (
            SELECT ct.chunk_id
            FROM chunk_tags ct
            JOIN tags t ON t.id = ct.tag_id
            WHERE t.workspace_id = $2
            AND t.name = ANY($4)
          )
        `
        : "";

    const result = await pool.query(
      `
      SELECT
        c.id AS chunk_id,
        c.text,
        c.document_id,
        d.title AS document_title,
        1 - (e.embedding <=> $1::vector) AS score
      FROM embeddings e
      JOIN chunks c ON c.id = e.chunk_id
      JOIN documents d ON d.id = c.document_id
      WHERE d.workspace_id = $2
      ${tagFilter}
      ORDER BY e.embedding <=> $1::vector
      LIMIT $3
      `,
      [params.queryEmbedding, params.workspaceId, topK, params.tags ?? []]
    );

    return result.rows.map((row) => ({
      chunkId: row.chunk_id,
      text: row.text,
      documentId: row.document_id,
      documentTitle: row.document_title,
      score: row.score,
    }));
  }
}
