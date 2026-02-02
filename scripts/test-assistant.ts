
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
