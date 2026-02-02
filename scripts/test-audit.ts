
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
