
import { Pool } from "pg";
import { randomUUID } from "crypto";

export async function linkTagToDocument(db: Pool, tagId: string, documentId: string) {
  await db.query(
    `INSERT INTO tag_links (id, tag_id, document_id, created_at)
     VALUES ($1, $2, $3, NOW())`,
    [randomUUID(), tagId, documentId]
  );
}

export async function linkTagToReference(db: Pool, tagId: string, referenceId: string) {
  await db.query(
    `INSERT INTO tag_links (id, tag_id, reference_id, created_at)
     VALUES ($1, $2, $3, NOW())`,
    [randomUUID(), tagId, referenceId]
  );
}
