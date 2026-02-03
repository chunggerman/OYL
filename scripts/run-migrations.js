"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pg_1 = require("pg");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const MIGRATIONS_DIR = path_1.default.join(__dirname, "../infra/db/migrations");
const db = new pg_1.Pool({
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
async function getAppliedMigrations() {
    const result = await db.query(`SELECT filename FROM schema_migrations`);
    return new Set(result.rows.map((r) => r.filename));
}
async function applyMigration(file) {
    const fullPath = path_1.default.join(MIGRATIONS_DIR, file);
    const sql = fs_1.default.readFileSync(fullPath, "utf8");
    console.log("Applying migration:", file);
    await db.query(sql);
    await db.query(`INSERT INTO schema_migrations (filename) VALUES ($1)`, [file]);
}
async function run() {
    await ensureMigrationsTable();
    const applied = await getAppliedMigrations();
    const files = fs_1.default
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
