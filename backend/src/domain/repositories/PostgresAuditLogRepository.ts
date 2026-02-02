import { db } from "../../db";
import { AuditLog } from "../entities/AuditLog";
import { AuditLogRepository } from "./AuditLogRepository";

export class PostgresAuditLogRepository implements AuditLogRepository {
  async findById(id: string): Promise<AuditLog | null> {
    const result = await db.query(
      `SELECT id, tenant_id, workspace_id, user_id, action, payload_json, created_at
       FROM audit_logs
       WHERE id = $1`,
      [id]
    );
    if (result.rowCount === 0) return null;
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

  async findByWorkspace(workspaceId: string): Promise<AuditLog[]> {
    const result = await db.query(
      `SELECT id, tenant_id, workspace_id, user_id, action, payload_json, created_at
       FROM audit_logs
       WHERE workspace_id = $1`,
      [workspaceId]
    );
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

  async create(log: AuditLog): Promise<void> {
    await db.query(
      `INSERT INTO audit_logs (id, tenant_id, workspace_id, user_id, action, payload_json, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        log.id,
        log.tenantId,
        log.workspaceId,
        log.userId,
        log.action,
        log.payloadJson,
        log.createdAt,
      ]
    );
  }
}
