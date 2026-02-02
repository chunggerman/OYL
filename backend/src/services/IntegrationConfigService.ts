import { IntegrationConfigRepository } from "../domain/repositories/IntegrationConfigRepository";
import { IntegrationConfig } from "../domain/entities/IntegrationConfig";

export class IntegrationConfigService {
  constructor(private readonly repo: IntegrationConfigRepository) {}

  async getConfig(id: string): Promise<IntegrationConfig | null> {
    return this.repo.findById(id);
  }

  async getByWorkspace(workspaceId: string): Promise<IntegrationConfig[]> {
    return this.repo.findByWorkspace(workspaceId);
  }

  async createConfig(config: IntegrationConfig): Promise<void> {
    await this.repo.create(config);
  }
}
