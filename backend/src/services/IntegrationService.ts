import {
  Integration,
  CreateIntegrationInput,
  UpdateIntegrationInput,
} from "../domain/entities/Integration";
import { IntegrationRepository } from "../domain/repositories/IntegrationRepository";

export class IntegrationService {
  constructor(private readonly repo: IntegrationRepository) {}

  listByWorkspace(workspaceId: string): Promise<Integration[]> {
    return this.repo.listByWorkspace(workspaceId);
  }

  create(input: CreateIntegrationInput): Promise<Integration> {
    return this.repo.create(input);
  }

  get(id: string): Promise<Integration | null> {
    return this.repo.getById(id);
  }

  update(id: string, input: UpdateIntegrationInput): Promise<Integration | null> {
    return this.repo.update(id, input);
  }

  delete(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}
