
import { Pool } from "pg";
import { randomUUID } from "crypto";

export async function registerIntegration(
  db: Pool,
  workspaceId: string,
  type: string,
  config: object
) {
  const id = randomUUID();

  await db.query(
    `INSERT INTO integration_configs (id, workspace_id, type, config, created_at, updated_at)
     VALUES ($1, $2, $3, $4, NOW(), NOW())`,
    [id, workspaceId, type, config]
  );

  return { id, type };
}
