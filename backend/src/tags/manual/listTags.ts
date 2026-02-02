
import { Pool } from "pg";

export async function listTags(db: Pool, workspaceId: string) {
  const result = await db.query(
    `SELECT id, name, created_at, updated_at
     FROM tags
     WHERE workspace_id = $1
     ORDER BY name ASC`,
    [workspaceId]
  );

  return result.rows;
}
