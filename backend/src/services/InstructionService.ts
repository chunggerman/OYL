import { InstructionRepository } from "../domain/repositories/InstructionRepository";
import { WorkspaceService } from "./WorkspaceService";
import { AssistantService } from "./AssistantService";

export class InstructionService {
  constructor(
    private instructionRepo: InstructionRepository,
    private workspaceService: WorkspaceService, // reserved for future use
    private assistantService: AssistantService  // reserved for future use
  ) {}

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

  // refinement with error modes for tests
  async refineInstruction(
    instructionId: string,
    opts: { debugFailAI: boolean }
  ) {
    const instruction = await this.instructionRepo.getById(instructionId);

    if (!instruction) {
      const err: any = new Error("Instruction not found");
      err.status = 404;
      throw err;
    }

    if (!instruction.content || instruction.content.trim() === "") {
      const err: any = new Error("Instruction content is empty");
      err.status = 400;
      throw err;
    }

    if (opts.debugFailAI) {
      const err: any = new Error("AI refinement failed");
      err.status = 500;
      throw err;
    }

    // Stub: return original instruction for now
    return instruction;
  }

  async linkToAssistant(assistantId: string, instructionId: string) {
    return this.instructionRepo.linkToAssistant(assistantId, instructionId);
  }
}
