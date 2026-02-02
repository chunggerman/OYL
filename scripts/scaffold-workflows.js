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

const createWorkflow = `
import { Pool } from "pg";
import { randomUUID } from "crypto";

export async function createWorkflow(db: Pool, workspaceId: string, name: string) {
  const id = randomUUID();

  await db.query(
    \`INSERT INTO workflows (id, workspace_id, name, created_at, updated_at)
     VALUES ($1, $2, $3, NOW(), NOW())\`,
    [id, workspaceId, name]
  );

  return { id, name };
}
`;

const addStep = `
import { Pool } from "pg";
import { randomUUID } from "crypto";

export async function addStep(
  db: Pool,
  workflowId: string,
  stepType: string,
  config: object,
  order: number
) {
  const id = randomUUID();

  await db.query(
    \`INSERT INTO workflow_steps (id, workflow_id, step_type, config, step_order, created_at)
     VALUES ($1, $2, $3, $4, $5, NOW())\`,
    [id, workflowId, stepType, config, order]
  );

  return { id, stepType, order };
}
`;

const runStep = `
import { Pool } from "pg";
import { search } from "../search/search";
import { runAssistant } from "../assistant/runAssistant";

export async function runStep(db: Pool, step: any, workspaceId: string) {
  const type = step.step_type;
  const config = step.config;

  if (type === "search") {
    const fakeEmbedding = new Array(128).fill(0.1);
    return await search(db, workspaceId, fakeEmbedding, config.filters || {});
  }

  if (type === "assistant") {
    return await runAssistant(db, config.assistantId, config.message);
  }

  if (type === "log") {
    console.log("Workflow log:", config.message);
    return { logged: true };
  }

  return { error: "Unknown step type" };
}
`;

const executeWorkflow = `
import { Pool } from "pg";
import { runStep } from "./runStep";

export async function executeWorkflow(db: Pool, workflowId: string) {
  const wf = await db.query(
    \`SELECT id, workspace_id, name FROM workflows WHERE id = $1\`,
    [workflowId]
  );

  if (wf.rows.length === 0) {
    throw new Error("Workflow not found");
  }

  const workflow = wf.rows[0];

  const steps = await db.query(
    \`SELECT id, step_type, config, step_order
     FROM workflow_steps
     WHERE workflow_id = $1
     ORDER BY step_order ASC\`,
    [workflowId]
  );

  const results = [];

  for (const step of steps.rows) {
    const result = await runStep(db, step, workflow.workspace_id);
    results.push({ step: step.step_type, result });
  }

  return {
    workflow: workflow.name,
    results
  };
}
`;

const testWorkflows = `
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
`;

// ------------------------------
// Write files
// ------------------------------

writeFile("backend/src/workflows/createWorkflow.ts", createWorkflow);
writeFile("backend/src/workflows/addStep.ts", addStep);
writeFile("backend/src/workflows/runStep.ts", runStep);
writeFile("backend/src/workflows/executeWorkflow.ts", executeWorkflow);
writeFile("scripts/test-workflows.ts", testWorkflows);

console.log("Workflow engine scaffolding complete.");
