import { PostgresAuditLogRepository } from "../repositories/PostgresAuditLogRepository";

export class AuditLogService {
  private repo: PostgresAuditLogRepository;

  constructor() {
    this.repo = new PostgresAuditLogRepository();
  }

  async list(workspaceId: string) {
    return this.repo.listByWorkspace(workspaceId);
  }

  async create(
    workspaceId: string,
    action: string,
    metadata: any
  ) {
    return this.repo.create(workspaceId, action, metadata);
  }

  async deleteByWorkspace(workspaceId: string) {
    await this.repo.deleteByWorkspace(workspaceId);
  }
}
