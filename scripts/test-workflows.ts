
import dotenv from "dotenv";
dotenv.config();

import { Pool } from "pg";
import { createWorkflow } from "../backend/src/workflows/createWorkflow";
import { addStep } from "../backend/src/workflows/addStep";
import { executeWorkflow } from "../backend/src/workflows/executeWorkflow";

const db = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function run() {
  const workspaceId = process.argv[2];

  if (!workspaceId) {
    console.error("Usage: npm run workflows <workspaceId>");
    process.exit(1);
  }

  const wf = await createWorkflow(db, workspaceId, "Demo Workflow");
  console.log("Created workflow:", wf);

  await addStep(db, wf.id, "log", { message: "Starting workflow" }, 1);
  await addStep(db, wf.id, "search", { filters: {} }, 2);
  await addStep(db, wf.id, "log", { message: "Workflow complete" }, 3);

  const result = await executeWorkflow(db, wf.id);
  console.log(JSON.stringify(result, null, 2));

  await db.end();
}

run();
