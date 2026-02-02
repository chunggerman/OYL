import { pool } from "../../db";
import { generateEmbeddingById } from "../../providers/embeddings";
import { embeddingProviders } from "../../providers/registry/embeddings";
import { generateAnswerFromContext } from "./llmService";

async function getWorkspaceEmbeddingProvider(workspaceId: string): Promise<string> {
  const res = await pool.query(
    `SELECT embedding_provider
     FROM workspace_settings
     WHERE workspace_id = $1`,
    [workspaceId]
  );
  const row = res.rows[0];
  if (row?.embedding_provider) return row.embedding_provider;
  return embeddingProviders[0].id;
}

async function semanticSearch(
  workspaceId: string,
  query: string,
  limit: number
) {
  const providerId = await getWorkspaceEmbeddingProvider(workspaceId);
  const queryVector = await generateEmbeddingById(providerId, query);

  const { rows } = await pool.query(
    `
    SELECT c.id as chunk_id,
           c.text,
           1 - (e.vector <=> $1::vector) AS score
    FROM embeddings e
    JOIN chunks c ON c.id = e.chunk_id
    WHERE c.workspace_id = $2
    ORDER BY e.vector <=> $1::vector
    LIMIT $3
    `,
    [queryVector, workspaceId, limit]
  );

  return rows;
}

async function tagSearch(
  workspaceId: string,
  tags: string[],
  limit: number
) {
  if (!tags.length) return [];

  const { rows } = await pool.query(
    `
    SELECT c.id as chunk_id,
           c.text,
           MAX(t.confidence) AS score
    FROM chunk_tags t
    JOIN chunks c ON c.id = t.chunk_id
    WHERE c.workspace_id = $1
      AND t.tag = ANY($2::text[])
    GROUP BY c.id, c.text
    ORDER BY score DESC
    LIMIT $3
    `,
    [workspaceId, tags, limit]
  );

  return rows;
}

export async function answerWithRag(
  workspaceId: string,
  question: string,
  options?: { tags?: string[]; semanticLimit?: number; tagLimit?: number }
): Promise<string> {
  const semanticLimit = options?.semanticLimit ?? 8;
  const tagLimit = options?.tagLimit ?? 8;
  const tags = options?.tags ?? [];

  const [semanticResults, tagResults] = await Promise.all([
    semanticSearch(workspaceId, question, semanticLimit),
    tagSearch(workspaceId, tags, tagLimit)
  ]);

  const mergedMap = new Map<string, { text: string; score: number; tags: string[] }>();

  for (const row of semanticResults) {
    mergedMap.set(row.chunk_id, {
      text: row.text,
      score: Number(row.score),
      tags: []
    });
  }

  if (tags.length) {
    for (const row of tagResults) {
      const existing = mergedMap.get(row.chunk_id);
      if (existing) {
        existing.score = Math.max(existing.score, Number(row.score));
        existing.tags = Array.from(new Set([...(existing.tags || []), ...tags]));
      } else {
        mergedMap.set(row.chunk_id, {
          text: row.text,
          score: Number(row.score),
          tags: [...tags]
        });
      }
    }
  }

  const merged = Array.from(mergedMap.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  return await generateAnswerFromContext(
    workspaceId,
    question,
    merged.map(m => ({ text: m.text, tags: m.tags }))
  );
}
