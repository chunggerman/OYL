import { pool } from "../../db";
import { WorkspaceSettings } from "../entities/WorkspaceSettings";

export class WorkspaceSettingsRepository {
  async getSettings(workspaceId: number): Promise<WorkspaceSettings[]> {
    const result = await pool.query(
      "SELECT * FROM workspace_settings WHERE workspace_id = $1 ORDER BY key",
      [workspaceId]
    );
    return result.rows;
  }

  async getSetting(workspaceId: number, key: string): Promise<WorkspaceSettings | null> {
    const result = await pool.query(
      "SELECT * FROM workspace_settings WHERE workspace_id = $1 AND key = $2 LIMIT 1",
      [workspaceId, key]
    );
    return result.rows[0] || null;
  }

  async upsertSetting(workspaceId: number, key: string, value: any): Promise<void> {
    await pool.query(
      `INSERT INTO workspace_settings (workspace_id, key, value)
       VALUES ($1, $2, $3)
       ON CONFLICT (workspace_id, key)
       DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`,
      [workspaceId, key, value]
    );
  }
}
