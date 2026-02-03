import { PostgresUserWorkspaceLinkRepository } from "../repositories/PostgresUserWorkspaceLinkRepository";

export class UserWorkspaceLinkService {
  private repo: PostgresUserWorkspaceLinkRepository;

  constructor() {
    this.repo = new PostgresUserWorkspaceLinkRepository();
  }

  async listByUser(userId: string, tenantId: string) {
    return this.repo.listByUser(userId, tenantId);
  }

  async listByWorkspace(workspaceId: string, tenantId: string) {
    return this.repo.listByWorkspace(workspaceId, tenantId);
  }

  async get(userId: string, workspaceId: string, tenantId: string) {
    return this.repo.get(userId, workspaceId, tenantId);
  }

  async create(
    userId: string,
    workspaceId: string,
    tenantId: string,
    role: string
  ) {
    return this.repo.create(userId, workspaceId, tenantId, role);
  }

  async updateRole(
    userId: string,
    workspaceId: string,
    tenantId: string,
    role: string
  ) {
    return this.repo.updateRole(userId, workspaceId, tenantId, role);
  }

  async delete(userId: string, workspaceId: string, tenantId: string) {
    await this.repo.delete(userId, workspaceId, tenantId);
  }
}
