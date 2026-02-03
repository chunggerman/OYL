"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeAuditLog = writeAuditLog;
const crypto_1 = require("crypto");
async function writeAuditLog(db, workspaceId, eventType, payload) {
    const id = (0, crypto_1.randomUUID)();
    await db.query(`INSERT INTO audit_logs (id, workspace_id, event_type, payload, created_at)
     VALUES ($1, $2, $3, $4, NOW())`, [id, workspaceId, eventType, payload]);
    return { id, eventType };
}
