
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
