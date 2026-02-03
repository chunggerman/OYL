"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceSettingsRepository = void 0;
const db_1 = require("../../db");
class WorkspaceSettingsRepository {
    async getSettings(workspaceId) {
        const result = await db_1.pool.query("SELECT * FROM workspace_settings WHERE workspace_id = $1 ORDER BY key", [workspaceId]);
        return result.rows;
    }
    async getSetting(workspaceId, key) {
        const result = await db_1.pool.query("SELECT * FROM workspace_settings WHERE workspace_id = $1 AND key = $2 LIMIT 1", [workspaceId, key]);
        return result.rows[0] || null;
    }
    async upsertSetting(workspaceId, key, value) {
        await db_1.pool.query(`INSERT INTO workspace_settings (workspace_id, key, value)
       VALUES ($1, $2, $3)
       ON CONFLICT (workspace_id, key)
       DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`, [workspaceId, key, value]);
    }
}
exports.WorkspaceSettingsRepository = WorkspaceSettingsRepository;
