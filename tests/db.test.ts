import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

describe("Database connectivity", () => {
  it("connects to the database", async () => {
    const db = new Pool({
      connectionString: process.env.DATABASE_URL
    });

    const result = await db.query("SELECT NOW()");
    expect(result.rows.length).toBe(1);

    await db.end();
  });
});
