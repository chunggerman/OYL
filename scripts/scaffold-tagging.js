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

const createTag = `
import { Pool } from "pg";
import { randomUUID } from "crypto";

export async function createTag(db: Pool, workspaceId: string, name: string) {
  const id = randomUUID();

  await db.query(
    \`INSERT INTO tags (id, workspace_id, name, created_at, updated_at)
     VALUES ($1, $2, $3, NOW(), NOW())\`,
    [id, workspaceId, name]
  );

  return { id, name };
}
`;

const linkTag = `
import { Pool } from "pg";
import { randomUUID } from "crypto";

export async function linkTagToDocument(db: Pool, tagId: string, documentId: string) {
  await db.query(
    \`INSERT INTO tag_links (id, tag_id, document_id, created_at)
     VALUES ($1, $2, $3, NOW())\`,
    [randomUUID(), tagId, documentId]
  );
}

export async function linkTagToReference(db: Pool, tagId: string, referenceId: string) {
  await db.query(
    \`INSERT INTO tag_links (id, tag_id, reference_id, created_at)
     VALUES ($1, $2, $3, NOW())\`,
    [randomUUID(), tagId, referenceId]
  );
}
`;

const listTags = `
import { Pool } from "pg";

export async function listTags(db: Pool, workspaceId: string) {
  const result = await db.query(
    \`SELECT id, name, created_at, updated_at
     FROM tags
     WHERE workspace_id = $1
     ORDER BY name ASC\`,
    [workspaceId]
  );

  return result.rows;
}
`;

const listTaggedDocuments = `
import { Pool } from "pg";

export async function listTaggedDocuments(db: Pool, tagId: string) {
  const result = await db.query(
    \`
    SELECT d.id, d.title, d.content
    FROM documents d
    JOIN tag_links tl ON tl.document_id = d.id
    WHERE tl.tag_id = $1
    ORDER BY d.created_at DESC
    \`,
    [tagId]
  );

  return result.rows;
}
`;

const listTaggedReferences = `
import { Pool } from "pg";

export async function listTaggedReferences(db: Pool, tagId: string) {
  const result = await db.query(
    \`
    SELECT r.id, r.name, r.description
    FROM reference_items r
    JOIN tag_links tl ON tl.reference_id = r.id
    WHERE tl.tag_id = $1
    ORDER BY r.created_at DESC
    \`,
    [tagId]
  );

  return result.rows;
}
`;

const testTags = `
import dotenv from "dotenv";
dotenv.config();

import { Pool } from "pg";
import { createTag } from "../backend/src/tags/createTag";
import { linkTagToDocument } from "../backend/src/tags/linkTag";
import { listTags } from "../backend/src/tags/listTags";
import { listTaggedDocuments } from "../backend/src/tags/listTaggedDocuments";

const db = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function run() {
  const workspaceId = process.argv[2];
  const documentId = process.argv[3];

  if (!workspaceId || !documentId) {
    console.error("Usage: npm run tags <workspaceId> <documentId>");
    process.exit(1);
  }

  const tag = await createTag(db, workspaceId, "Demo Tag");
  console.log("Created tag:", tag);

  await linkTagToDocument(db, tag.id, documentId);
  console.log("Linked tag to document");

  const tags = await listTags(db, workspaceId);
  console.log("All tags:", tags);

  const docs = await listTaggedDocuments(db, tag.id);
  console.log("Documents with this tag:", docs);

  await db.end();
}

run();
`;

// ------------------------------
// Write files
// ------------------------------

writeFile("backend/src/tags/createTag.ts", createTag);
writeFile("backend/src/tags/linkTag.ts", linkTag);
writeFile("backend/src/tags/listTags.ts", listTags);
writeFile("backend/src/tags/listTaggedDocuments.ts", listTaggedDocuments);
writeFile("backend/src/tags/listTaggedReferences.ts", listTaggedReferences);
writeFile("scripts/test-tags.ts", testTags);

console.log("Tagging scaffolding complete.");
