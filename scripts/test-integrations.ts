
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
