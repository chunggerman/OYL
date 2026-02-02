const fs = require("fs");
const path = require("path");

function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content, "utf8");
  console.log("Created:", filePath);
}

// ------------------------------
// File contents
// ------------------------------

const registerIntegration = `
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
    \`INSERT INTO integration_configs (id, workspace_id, type, config, created_at, updated_at)
     VALUES ($1, $2, $3, $4, NOW(), NOW())\`,
    [id, workspaceId, type, config]
  );

  return { id, type };
}
`;

const validateIntegration = `
export function validateIntegrationConfig(type: string, config: any) {
  if (type === "webhook") {
    if (!config.url) throw new Error("Webhook integration requires 'url'");
    return true;
  }

  if (type === "database") {
    if (!config.connectionString) throw new Error("Database integration requires 'connectionString'");
    return true;
  }

  return true;
}
`;

const runIntegration = `
import { Pool } from "pg";
import { validateIntegrationConfig } from "./validateIntegration";
import { randomUUID } from "crypto";

export async function runIntegration(db: Pool, integrationId: string) {
  const result = await db.query(
    \`SELECT id, workspace_id, type, config
     FROM integration_configs
     WHERE id = $1\`,
    [integrationId]
  );

  if (result.rows.length === 0) {
    throw new Error("Integration not found");
  }

  const integration = result.rows[0];
  validateIntegrationConfig(integration.type, integration.config);

  const runId = randomUUID();

  await db.query(
    \`INSERT INTO data_sources (id, workspace_id, integration_id, created_at)
     VALUES ($1, $2, $3, NOW())\`,
    [runId, integration.workspace_id, integration.id]
  );

  return {
    integration: integration.type,
    runId
  };
}
`;

const ingestExternalData = `
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
    \`INSERT INTO documents (id, workspace_id, title, content, source_id, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, NOW(), NOW())\`,
    [id, workspaceId, title, content, sourceId]
  );

  return { id, title };
}
`;

const testIntegrations = `
import dotenv from "dotenv";
dotenv.config();

import { Pool } from "pg";
import { registerIntegration } from "../backend/src/integrations/registerIntegration";
import { runIntegration } from "../backend/src/integrations/runIntegration";
import { ingestExternalData } from "../backend/src/integrations/ingestExternalData";

const db = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function run() {
  const workspaceId = process.argv[2];

  if (!workspaceId) {
    console.error("Usage: npm run integrations <workspaceId>");
    process.exit(1);
  }

  const integration = await registerIntegration(db, workspaceId, "webhook", {
    url: "https://example.com/hook"
  });

  console.log("Registered integration:", integration);

  const runInfo = await runIntegration(db, integration.id);
  console.log("Integration run:", runInfo);

  const doc = await ingestExternalData(
    db,
    workspaceId,
    runInfo.runId,
    "External Data",
    "This content was ingested from an integration."
  );

  console.log("Ingested external document:", doc);

  await db.end();
}

run();
`;

// ------------------------------
// Write files
// ------------------------------

writeFile("backend/src/integrations/registerIntegration.ts", registerIntegration);
writeFile("backend/src/integrations/validateIntegration.ts", validateIntegration);
writeFile("backend/src/integrations/runIntegration.ts", runIntegration);
writeFile("backend/src/integrations/ingestExternalData.ts", ingestExternalData);
writeFile("scripts/test-integrations.ts", testIntegrations);

console.log("Integrations scaffolding complete.");
