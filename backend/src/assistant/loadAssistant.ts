
import { Pool } from "pg";

export async function loadAssistant(db: Pool, assistantId: string) {
  const result = await db.query(
    `SELECT id, workspace_id, name, created_at, updated_at
     FROM assistants
     WHERE id = $1`,
    [assistantId]
  );

  if (result.rows.length === 0) {
    throw new Error("Assistant not found");
  }

  return result.rows[0];
}
