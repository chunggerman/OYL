import { PostgresWorkspaceRepository } from "../repositories/PostgresWorkspaceRepository";

export class WorkspaceService {
  private repo: PostgresWorkspaceRepository;

  constructor() {
    this.repo = new PostgresWorkspaceRepository();
  }

  async list(tenantId: string) {
    return this.repo.listByTenant(tenantId);
  }

  async get(id: string, tenantId: string) {
    return this.repo.getById(id, tenantId);
  }

  async create(
    tenantId: string,
    name: string,
    description: string | null
  ) {
    return this.repo.create(tenantId, name, description);
  }

  async update(
    id: string,
    tenantId: string,
    name: string,
    description: string | null
  ) {
    return this.repo.update(id, tenantId, name, description);
  }

  async delete(id: string, tenantId: string) {
    await this.repo.delete(id, tenantId);
  }
}
