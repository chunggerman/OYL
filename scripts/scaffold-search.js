const fs = require("fs");
const path = require("path");

function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content, "utf8");
  console.log("Created:", filePath);
}

// ------------------------------
// File contents
// ------------------------------

const vectorSearch = `
import { Pool } from "pg";

export async function vectorSearch(
  db: Pool,
  workspaceId: string,
  queryEmbedding: number[],
  limit = 5
) {
  const result = await db.query(
    \`
    SELECT
      c.id AS chunk_id,
      c.document_id,
      c.content,
      e.vector
    FROM embeddings e
    JOIN chunks c ON c.id = e.chunk_id
    WHERE e.workspace_id = $1
    ORDER BY (e.vector <-> $2::vector) ASC
    LIMIT $3
    \`,
    [workspaceId, queryEmbedding, limit]
  );

  return result.rows;
}
`;

const metadataSearch = `
import { Pool } from "pg";

export async function metadataSearch(
  db: Pool,
  workspaceId: string,
  filters: { tagId?: string; referenceId?: string }
) {
  let sql = \`
    SELECT d.id, d.title, d.content
    FROM documents d
    WHERE d.workspace_id = $1
  \`;

  const params = [workspaceId];
  let idx = 2;

  if (filters.tagId) {
    sql += \`
      AND d.id IN (
        SELECT document_id FROM tag_links WHERE tag_id = $${idx}
      )
    \`;
    params.push(filters.tagId);
    idx++;
  }

  if (filters.referenceId) {
    sql += \` AND d.reference_id = $${idx} \`;
    params.push(filters.referenceId);
    idx++;
  }

  const result = await db.query(sql, params);
  return result.rows;
}
`;

const search = `
import { Pool } from "pg";
import { vectorSearch } from "./vectorSearch";
import { metadataSearch } from "./metadataSearch";

export async function search(
  db: Pool,
  workspaceId: string,
  queryEmbedding: number[],
  filters: { tagId?: string; referenceId?: string } = {}
) {
  const vectorResults = await vectorSearch(db, workspaceId, queryEmbedding);
  const metadataResults = await metadataSearch(db, workspaceId, filters);

  return {
    vector: vectorResults,
    metadata: metadataResults
  };
}
`;

const testSearch = `
import dotenv from "dotenv";
dotenv.config();

import { Pool } from "pg";
import { search } from "../backend/src/search/search";

const db = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function run() {
  const workspaceId = process.argv[2];
  if (!workspaceId) {
    console.error("Usage: npm run search <workspaceId>");
    process.exit(1);
  }

  const fakeEmbedding = new Array(128).fill(0.1);

  const results = await search(db, workspaceId, fakeEmbedding, {});
  console.log(JSON.stringify(results, null, 2));

  await db.end();
}

run();
`;

// ------------------------------
// Write files
// ------------------------------

writeFile("backend/src/search/vectorSearch.ts", vectorSearch);
writeFile("backend/src/search/metadataSearch.ts", metadataSearch);
writeFile("backend/src/search/search.ts", search);
writeFile("scripts/test-search.ts", testSearch);

console.log("Search scaffolding complete.");
