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

const writeAuditLog = `
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
    \`INSERT INTO audit_logs (id, workspace_id, event_type, payload, created_at)
     VALUES ($1, $2, $3, $4, NOW())\`,
    [id, workspaceId, eventType, payload]
  );

  return { id, eventType };
}
`;

const listAuditLogs = `
import { Pool } from "pg";

export async function listAuditLogs(
  db: Pool,
  workspaceId: string,
  limit = 50
) {
  const result = await db.query(
    \`
    SELECT id, event_type, payload, created_at
    FROM audit_logs
    WHERE workspace_id = $1
    ORDER BY created_at DESC
    LIMIT $2
    \`,
    [workspaceId, limit]
  );

  return result.rows;
}
`;

const testAudit = `
import dotenv from "dotenv";
dotenv.config();

import { Pool } from "pg";
import { writeAuditLog } from "../backend/src/audit/writeAuditLog";
import { listAuditLogs } from "../backend/src/audit/listAuditLogs";

const db = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function run() {
  const workspaceId = process.argv[2];

  if (!workspaceId) {
    console.error("Usage: npm run audit <workspaceId>");
    process.exit(1);
  }

  const entry = await writeAuditLog(db, workspaceId, "demo_event", {
    message: "This is a test audit log entry"
  });

  console.log("Wrote audit log:", entry);

  const logs = await listAuditLogs(db, workspaceId);
  console.log("Recent logs:", logs);

  await db.end();
}

run();
`;

// ------------------------------
// Write files
// ------------------------------

writeFile("backend/src/audit/writeAuditLog.ts", writeAuditLog);
writeFile("backend/src/audit/listAuditLogs.ts", listAuditLogs);
writeFile("scripts/test-audit.ts", testAudit);

console.log("Audit logging scaffolding complete.");
