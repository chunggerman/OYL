import { PostgresIntegrationConfigRepository } from "../repositories/PostgresIntegrationConfigRepository";

export class IntegrationConfigService {
  private repo: PostgresIntegrationConfigRepository;

  constructor() {
    this.repo = new PostgresIntegrationConfigRepository();
  }

  async list(workspaceId: string) {
    return this.repo.listByWorkspace(workspaceId);
  }

  async get(id: string, workspaceId: string) {
    return this.repo.getById(id, workspaceId);
  }

  async create(
    workspaceId: string,
    provider: string,
    config: any
  ) {
    return this.repo.create(workspaceId, provider, config);
  }

  async update(
    id: string,
    workspaceId: string,
    provider: string,
    config: any
  ) {
    return this.repo.update(id, workspaceId, provider, config);
  }

  async delete(id: string, workspaceId: string) {
    await this.repo.delete(id, workspaceId);
  }
}
