
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
