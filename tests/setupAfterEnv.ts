import { pool } from "../backend/src/db";

afterAll(async () => {
  await pool.end();
});
