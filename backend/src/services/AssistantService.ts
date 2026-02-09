// backend/src/services/AssistantService.ts

import {
  Assistant,
  CreateAssistantInput,
  UpdateAssistantInput,
} from "../domain/entities/Assistant";
import { AssistantRepository } from "../domain/repositories/AssistantRepository";

export class AssistantService {
  constructor(private readonly repo: AssistantRepository) {}

  list(workspaceId: string): Promise<Assistant[]> {
    return this.repo.listByWorkspace(workspaceId);
  }

  create(input: CreateAssistantInput): Promise<Assistant> {
    return this.repo.create(input);
  }

  get(id: string): Promise<Assistant | null> {
    return this.repo.getById(id);
  }

  update(id: string, input: UpdateAssistantInput): Promise<Assistant | null> {
    return this.repo.update(id, input);
  }

  delete(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}
