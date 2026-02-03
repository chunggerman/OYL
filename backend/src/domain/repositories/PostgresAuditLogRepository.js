"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresAuditLogRepository = void 0;
const db_1 = require("../../db");
class PostgresAuditLogRepository {
    async findById(id) {
        const result = await db_1.db.query(`SELECT id, tenant_id, workspace_id, user_id, action, payload_json, created_at
       FROM audit_logs
       WHERE id = $1`, [id]);
        if (result.rowCount === 0)
            return null;
        const row = result.rows[0];
        return {
            id: row.id,
            tenantId: row.tenant_id,
            workspaceId: row.workspace_id,
            userId: row.user_id,
            action: row.action,
            payloadJson: row.payload_json,
            createdAt: row.created_at,
        };
    }
    async findByWorkspace(workspaceId) {
        const result = await db_1.db.query(`SELECT id, tenant_id, workspace_id, user_id, action, payload_json, created_at
       FROM audit_logs
       WHERE workspace_id = $1`, [workspaceId]);
        return result.rows.map((row) => ({
            id: row.id,
            tenantId: row.tenant_id,
            workspaceId: row.workspace_id,
            userId: row.user_id,
            action: row.action,
            payloadJson: row.payload_json,
            createdAt: row.created_at,
        }));
    }
    async create(log) {
        await db_1.db.query(`INSERT INTO audit_logs (id, tenant_id, workspace_id, user_id, action, payload_json, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`, [
            log.id,
            log.tenantId,
            log.workspaceId,
            log.userId,
            log.action,
            log.payloadJson,
            log.createdAt,
        ]);
    }
}
exports.PostgresAuditLogRepository = PostgresAuditLogRepository;
