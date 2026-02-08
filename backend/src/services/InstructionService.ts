// backend/src/services/InstructionService.ts

import { InstructionRepository } from "../domain/repositories/InstructionRepository";
import { WorkspaceService } from "./WorkspaceService";
import { AssistantService } from "./AssistantService";

export class InstructionService {
  constructor(
    private instructionRepo: InstructionRepository,
    private workspaceService: WorkspaceService, // kept for future use, not called
    private assistantService: AssistantService // kept for future use, not called
  ) {}

  // Matches controller: createInstruction(workspaceId, { name, content })
  async createInstruction(
    workspaceId: string,
    data: { name: string; content: string }
  ) {
    return this.instructionRepo.create({
      workspaceId,
      name: data.name,
      content: data.content,
    });
  }

  async getInstruction(id: string) {
    return this.instructionRepo.getById(id);
  }

  async listInstructions(workspaceId: string) {
    return this.instructionRepo.listByWorkspace(workspaceId);
  }

  async updateInstruction(
    id: string,
    data: {
      name?: string;
      content?: string;
      refinedContent?: string | null;
    }
  ) {
    return this.instructionRepo.update(id, data);
  }

  async deleteInstruction(id: string) {
    return this.instructionRepo.softDelete(id);
  }

  // Matches controller: refineInstruction(instructionId)
  async refineInstruction(instructionId: string) {
    const instruction = await this.instructionRepo.getById(instructionId);
    // Stub: no refinement logic yet, just return what we have
    return instruction;
  }

  // Matches controller: linkToAssistant(assistantId, instructionId)
  async linkToAssistant(assistantId: string, instructionId: string) {
    return this.instructionRepo.linkToAssistant(assistantId, instructionId);
  }
}
