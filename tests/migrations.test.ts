import { execSync } from "child_process";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

describe("Database migrations", () => {
  const db = new Pool({
    connectionString: process.env.DATABASE_URL
  });

  afterAll(async () => {
    await db.end();
  });

  it("runs migrations without errors", () => {
    expect(() => {
      execSync("npm run migrate", { stdio: "inherit" });
    }).not.toThrow();
  });

  it("workspace_settings table exists", async () => {
    const result = await db.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_name = 'workspace_settings'
    `);

    expect(result.rows.length).toBe(1);
  });
});
