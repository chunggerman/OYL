import { Assistant } from "../entities/Assistant";

export interface AssistantRepository {
  findById(id: string): Promise<Assistant | null>;
  findByWorkspace(workspaceId: string): Promise<Assistant[]>;
  create(assistant: Assistant): Promise<void>;
}
