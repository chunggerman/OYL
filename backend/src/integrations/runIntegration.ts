
import { Pool } from "pg";
import { validateIntegrationConfig } from "./validateIntegration";
import { randomUUID } from "crypto";

export async function runIntegration(db: Pool, integrationId: string) {
  const result = await db.query(
    `SELECT id, workspace_id, type, config
     FROM integration_configs
     WHERE id = $1`,
    [integrationId]
  );

  if (result.rows.length === 0) {
    throw new Error("Integration not found");
  }

  const integration = result.rows[0];
  validateIntegrationConfig(integration.type, integration.config);

  const runId = randomUUID();

  await db.query(
    `INSERT INTO data_sources (id, workspace_id, integration_id, created_at)
     VALUES ($1, $2, $3, NOW())`,
    [runId, integration.workspace_id, integration.id]
  );

  return {
    integration: integration.type,
    runId
  };
}
