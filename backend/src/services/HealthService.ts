import { pool } from "../db";

export class HealthService {
  async check() {
    // simple DB check
    try {
      await pool.query("SELECT 1");
      return { status: "ok", database: "connected" };
    } catch (err) {
      return { status: "degraded", database: "error" };
    }
  }
}
