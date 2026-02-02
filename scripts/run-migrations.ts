import dotenv from "dotenv";
dotenv.config();

import { Pool } from "pg";
import fs from "fs";
import path from "path";

const MIGRATIONS_DIR = path.join(__dirname, "../infra/db/migrations");

const db = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function ensureMigrationsTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id SERIAL PRIMARY KEY,
      filename TEXT UNIQUE NOT NULL,
      executed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

async function getAppliedMigrations(): Promise<Set<string>> {
  const result = await db.query(`SELECT filename FROM schema_migrations`);
  return new Set(result.rows.map((r) => r.filename));
}

async function applyMigration(file: string) {
  const fullPath = path.join(MIGRATIONS_DIR, file);
  const sql = fs.readFileSync(fullPath, "utf8");

  console.log("Applying migration:", file);
  await db.query(sql);

  await db.query(
    `INSERT INTO schema_migrations (filename) VALUES ($1)`,
    [file]
  );
}

async function run() {
  await ensureMigrationsTable();

  const applied = await getAppliedMigrations();

  const files = fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  for (const file of files) {
    if (applied.has(file)) {
      console.log("Skipping already applied migration:", file);
      continue;
    }

    await applyMigration(file);
  }

  console.log("All migrations applied.");
  await db.end();
}

run().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
