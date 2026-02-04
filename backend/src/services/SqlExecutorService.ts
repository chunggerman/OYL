import { pool } from "../db";

export class SqlExecutorService {
  async execute(sql: string, params: any[] = []): Promise<{
    rows: any[];
    rowCount: number;
  }> {
    const result = await pool.query(sql, params);
    return {
      rows: result.rows,
      rowCount: result.rowCount,
    };
  }
}
