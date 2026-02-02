import { AuditLogRepository } from "../domain/repositories/AuditLogRepository";
import { AuditLog } from "../domain/entities/AuditLog";

export class AuditLogService {
  constructor(private readonly repo: AuditLogRepository) {}

  async getLog(id: string): Promise<AuditLog | null> {
    return this.repo.findById(id);
  }

  async getByWorkspace(workspaceId: string): Promise<AuditLog[]> {
    return this.repo.findByWorkspace(workspaceId);
  }

  async createLog(log: AuditLog): Promise<void> {
    await this.repo.create(log);
  }
}
