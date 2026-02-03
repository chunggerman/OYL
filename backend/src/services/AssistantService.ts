import { AssistantRepository } from "../domain/repositories/AssistantRepository";
import { Assistant } from "../domain/entities/Assistant";
import { WorkspaceRepository } from "../domain/repositories/WorkspaceRepository";

export class AssistantService {
  private assistantRepository: AssistantRepository;
  private workspaceRepository: WorkspaceRepository;

  constructor(
    assistantRepository?: AssistantRepository,
    workspaceRepository?: WorkspaceRepository
  ) {
    this.assistantRepository = assistantRepository ?? new AssistantRepository();
    this.workspaceRepository = workspaceRepository ?? new WorkspaceRepository();
  }

  async createAssistant(params: {
    workspaceId: string;
    name: string;
    instruction?: string | null;
    aiInstruction?: string | null;
    settingsJson?: Record<string, any> | null;
  }): Promise<Assistant> {
    const workspace = await this.workspaceRepository.findById(params.workspaceId);
    if (!workspace) {
      throw new Error("Workspace not found");
    }

    return this.assistantRepository.create(
      params.workspaceId,
      params.name,
      params.instruction ?? null,
      params.aiInstruction ?? null,
      params.settingsJson ?? null
    );
  }

  async getAssistantById(id: string): Promise<Assistant | null> {
    return this.assistantRepository.findById(id);
  }

  async listAssistantsByWorkspace(workspaceId: string): Promise<Assistant[]> {
    return this.assistantRepository.listByWorkspace(workspaceId);
  }

  async deleteAssistant(id: string): Promise<void> {
    await this.assistantRepository.softDelete(id);
  }
}
