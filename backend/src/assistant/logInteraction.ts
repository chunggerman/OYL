
import { Pool } from "pg";
import { randomUUID } from "crypto";

export async function logInteraction(
  db: Pool,
  assistantId: string,
  userMessage: string,
  assistantResponse: string
) {
  await db.query(
    `INSERT INTO audit_logs (id, assistant_id, user_message, assistant_response, created_at)
     VALUES ($1, $2, $3, $4, NOW())`,
    [randomUUID(), assistantId, userMessage, assistantResponse]
  );
}
