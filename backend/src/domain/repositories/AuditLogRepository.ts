import { AuditLog } from "../entities/AuditLog";

export interface AuditLogRepository {
  findById(id: string): Promise<AuditLog | null>;
  findByWorkspace(workspaceId: string): Promise<AuditLog[]>;
  create(log: AuditLog): Promise<void>;
}
