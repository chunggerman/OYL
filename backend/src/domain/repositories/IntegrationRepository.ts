import {
  Integration,
  CreateIntegrationInput,
  UpdateIntegrationInput,
} from "../entities/Integration";

export interface IntegrationRepository {
  listByWorkspace(workspaceId: string): Promise<Integration[]>;
  create(input: CreateIntegrationInput): Promise<Integration>;
  getById(id: string): Promise<Integration | null>;
  update(id: string, input: UpdateIntegrationInput): Promise<Integration | null>;
  delete(id: string): Promise<void>;
}
