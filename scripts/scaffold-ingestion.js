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

const ingestDocument = `
import { Pool } from "pg";
import { randomUUID } from "crypto";
import { splitIntoChunks } from "./splitIntoChunks";
import { embedText } from "./embedText";

export async function ingestDocument(db: Pool, workspaceId: string, title: string, content: string) {
  const documentId = randomUUID();

  await db.query(
    \`INSERT INTO documents (id, workspace_id, title, content, created_at, updated_at)
     VALUES ($1, $2, $3, $4, NOW(), NOW())\`,
    [documentId, workspaceId, title, content]
  );

  const chunks = splitIntoChunks(content);
  const embeddings = await embedText(chunks);

  for (let i = 0; i < chunks.length; i++) {
    const chunkId = randomUUID();

    await db.query(
      \`INSERT INTO chunks (id, document_id, workspace_id, content, created_at, updated_at)
       VALUES ($1, $2, $3, $4, NOW(), NOW())\`,
      [chunkId, documentId, workspaceId, chunks[i]]
    );

    await db.query(
      \`INSERT INTO embeddings (id, chunk_id, workspace_id, vector, created_at, updated_at)
       VALUES ($1, $2, $3, $4, NOW(), NOW())\`,
      [randomUUID(), chunkId, workspaceId, embeddings[i]]
    );
  }

  return { documentId };
}
`;

const splitIntoChunks = `
export function splitIntoChunks(text: string, maxLength = 500): string[] {
  const words = text.split(/\\s+/);
  const chunks: string[] = [];
  let current: string[] = [];

  for (const w of words) {
    if ((current.join(" ") + " " + w).length > maxLength) {
      chunks.push(current.join(" "));
      current = [];
    }
    current.push(w);
  }

  if (current.length > 0) {
    chunks.push(current.join(" "));
  }

  return chunks;
}
`;

const embedText = `
export async function embedText(chunks: string[]): Promise<number[][]> {
  return chunks.map((chunk) => {
    const vector = new Array(128).fill(0).map((_, i) => (chunk.length % (i + 1)) / 10);
    return vector;
  });
}
`;

const testIngest = `
import dotenv from "dotenv";
dotenv.config();

import { Pool } from "pg";
import { ingestDocument } from "../backend/src/ingestion/ingestDocument";

const db = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function run() {
  const workspaceId = process.argv[2];
  if (!workspaceId) {
    console.error("Usage: npm run ingest <workspaceId>");
    process.exit(1);
  }

  const result = await ingestDocument(
    db,
    workspaceId,
    "Test Document",
    "This is a long test document that will be chunked and embedded..."
  );

  console.log("Ingested document:", result.documentId);
  await db.end();
}

run();
`;

// ------------------------------
// Write files
// ------------------------------

writeFile("backend/src/ingestion/ingestDocument.ts", ingestDocument);
writeFile("backend/src/ingestion/splitIntoChunks.ts", splitIntoChunks);
writeFile("backend/src/ingestion/embedText.ts", embedText);
writeFile("scripts/test-ingest.ts", testIngest);

console.log("Ingestion scaffolding complete.");
