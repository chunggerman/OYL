
import { Pool } from "pg";
import { randomUUID } from "crypto";

export async function writeAuditLog(
  db: Pool,
  workspaceId: string,
  eventType: string,
  payload: object
) {
  const id = randomUUID();

  await db.query(
    `INSERT INTO audit_logs (id, workspace_id, event_type, payload, created_at)
     VALUES ($1, $2, $3, $4, NOW())`,
    [id, workspaceId, eventType, payload]
  );

  return { id, eventType };
}
