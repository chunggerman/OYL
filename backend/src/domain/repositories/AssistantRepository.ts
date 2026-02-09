// backend/src/domain/repositories/AssistantRepository.ts

import {
  Assistant,
  CreateAssistantInput,
  UpdateAssistantInput,
} from "../entities/Assistant";

export interface AssistantRepository {
  listByWorkspace(workspaceId: string): Promise<Assistant[]>;
  create(input: CreateAssistantInput): Promise<Assistant>;
  getById(id: string): Promise<Assistant | null>;
  update(id: string, input: UpdateAssistantInput): Promise<Assistant | null>;
  delete(id: string): Promise<void>;
}
