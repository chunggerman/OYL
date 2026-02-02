
import { Pool } from "pg";
import { randomUUID } from "crypto";

export async function createTag(db: Pool, workspaceId: string, name: string) {
  const id = randomUUID();

  await db.query(
    `INSERT INTO tags (id, workspace_id, name, created_at, updated_at)
     VALUES ($1, $2, $3, NOW(), NOW())`,
    [id, workspaceId, name]
  );

  return { id, name };
}
