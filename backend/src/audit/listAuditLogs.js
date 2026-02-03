"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAuditLogs = listAuditLogs;
async function listAuditLogs(db, workspaceId, limit = 50) {
    const result = await db.query(`
    SELECT id, event_type, payload, created_at
    FROM audit_logs
    WHERE workspace_id = $1
    ORDER BY created_at DESC
    LIMIT $2
    `, [workspaceId, limit]);
    return result.rows;
}
