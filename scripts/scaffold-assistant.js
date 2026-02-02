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

const loadAssistant = `
import { Pool } from "pg";

export async function loadAssistant(db: Pool, assistantId: string) {
  const result = await db.query(
    \`SELECT id, workspace_id, name, created_at, updated_at
     FROM assistants
     WHERE id = $1\`,
    [assistantId]
  );

  if (result.rows.length === 0) {
    throw new Error("Assistant not found");
  }

  return result.rows[0];
}
`;

const generateResponse = `
export async function generateResponse(prompt: string, context: string[]) {
  // Placeholder LLM logic — deterministic for now
  const combined = context.join(" ").slice(0, 200);
  return \`[DEMO RESPONSE] Prompt: "\${prompt}" | Context: "\${combined}"\`;
}
`;

const logInteraction = `
import { Pool } from "pg";
import { randomUUID } from "crypto";

export async function logInteraction(
  db: Pool,
  assistantId: string,
  userMessage: string,
  assistantResponse: string
) {
  await db.query(
    \`INSERT INTO audit_logs (id, assistant_id, user_message, assistant_response, created_at)
     VALUES ($1, $2, $3, $4, NOW())\`,
    [randomUUID(), assistantId, userMessage, assistantResponse]
  );
}
`;

const runAssistant = `
import { Pool } from "pg";
import { loadAssistant } from "./loadAssistant";
import { generateResponse } from "./generateResponse";
import { logInteraction } from "./logInteraction";
import { search } from "../search/search";

export async function runAssistant(
  db: Pool,
  assistantId: string,
  userMessage: string
) {
  const assistant = await loadAssistant(db, assistantId);

  const fakeEmbedding = new Array(128).fill(0.1);

  const searchResults = await search(
    db,
    assistant.workspace_id,
    fakeEmbedding,
    {}
  );

  const context = searchResults.vector.map((c) => c.content);

  const response = await generateResponse(userMessage, context);

  await logInteraction(db, assistantId, userMessage, response);

  return {
    assistant: assistant.name,
    response,
    contextUsed: context
  };
}
`;

const testAssistant = `
import dotenv from "dotenv";
dotenv.config();

import { Pool } from "pg";
import { runAssistant } from "../backend/src/assistant/runAssistant";

const db = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function run() {
  const assistantId = process.argv[2];
  const message = process.argv.slice(3).join(" ");

  if (!assistantId || !message) {
    console.error("Usage: npm run assistant <assistantId> <message>");
    process.exit(1);
  }

  const result = await runAssistant(db, assistantId, message);
  console.log(JSON.stringify(result, null, 2));

  await db.end();
}

run();
`;

// ------------------------------
// Write files
// ------------------------------

writeFile("backend/src/assistant/loadAssistant.ts", loadAssistant);
writeFile("backend/src/assistant/generateResponse.ts", generateResponse);
writeFile("backend/src/assistant/logInteraction.ts", logInteraction);
writeFile("backend/src/assistant/runAssistant.ts", runAssistant);
writeFile("scripts/test-assistant.ts", testAssistant);

console.log("Assistant runtime scaffolding complete.");
