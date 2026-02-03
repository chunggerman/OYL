"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ragQuery = ragQuery;
const db_1 = require("../../db");
const embeddingService_1 = require("./embeddingService");
const llmService_1 = require("../llmService");
async function ragQuery(workspaceId, query) {
    const queryEmbedding = await (0, embeddingService_1.embedText)(query);
    // 1. Embedding search
    const embeddingResults = await db_1.pool.query(`
    SELECT
      c.id AS chunk_id,
      c.text,
      (embeddings.embedding <=> $1) AS distance
    FROM embeddings
    JOIN chunks c ON c.id = embeddings.chunk_id
    WHERE c.workspace_id = $2
    ORDER BY embeddings.embedding <=> $1
    LIMIT 8
    `, [queryEmbedding, workspaceId]);
    // 2. Semantic tag search
    const tagResults = await db_1.pool.query(`
    SELECT
      c.id AS chunk_id,
      c.text,
      0.25 AS distance
    FROM chunk_tags t
    JOIN chunks c ON c.id = t.chunk_id
    WHERE c.workspace_id = $1
      AND t.tag ILIKE ANY (ARRAY[
        '%' || $2 || '%'
      ])
    LIMIT 8
    `, [workspaceId, query]);
    // 3. Merge + dedupe
    const map = new Map();
    for (const row of embeddingResults.rows) {
        map.set(row.chunk_id, row);
    }
    for (const row of tagResults.rows) {
        if (!map.has(row.chunk_id)) {
            map.set(row.chunk_id, row);
        }
    }
    const merged = Array.from(map.values())
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 8);
    // 4. Build context
    const context = merged.map(r => r.text).join("\n\n");
    // 5. LLM answer
    const messages = [
        {
            role: "system",
            content: "Answer using ONLY the provided context."
        },
        {
            role: "user",
            content: `Context:\n${context}\n\nQuestion: ${query}`
        }
    ];
    const answer = await (0, llmService_1.callLlmById)("qwen2.5-14b", messages);
    return {
        answer,
        chunks: merged
    };
}
