import { IntegrationConfig } from "../entities/IntegrationConfig";

export interface IntegrationConfigRepository {
  findById(id: string): Promise<IntegrationConfig | null>;
  findByWorkspace(workspaceId: string): Promise<IntegrationConfig[]>;
  create(config: IntegrationConfig): Promise<void>;
}
