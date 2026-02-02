
import { Pool } from "pg";
import { randomUUID } from "crypto";

export async function ingestExternalData(
  db: Pool,
  workspaceId: string,
  sourceId: string,
  title: string,
  content: string
) {
  const id = randomUUID();

  await db.query(
    `INSERT INTO documents (id, workspace_id, title, content, source_id, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, NOW(), NOW())`,
    [id, workspaceId, title, content, sourceId]
  );

  return { id, title };
}
