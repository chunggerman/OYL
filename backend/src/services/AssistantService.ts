import { AssistantRepository } from "../domain/repositories/AssistantRepository";
import { Assistant } from "../domain/entities/Assistant";

export class AssistantService {
  constructor(private readonly repo: AssistantRepository) {}

  async getAssistant(id: string): Promise<Assistant | null> {
    return this.repo.findById(id);
  }

  async getByWorkspace(workspaceId: string): Promise<Assistant[]> {
    return this.repo.findByWorkspace(workspaceId);
  }

  async createAssistant(assistant: Assistant): Promise<void> {
    await this.repo.create(assistant);
  }
}
