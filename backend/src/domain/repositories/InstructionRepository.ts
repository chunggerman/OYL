// backend/src/domain/repositories/InstructionRepository.ts

import { Instruction } from "../entities/Instruction";

export interface InstructionRepository {
  create(data: {
    workspaceId: string;
    name: string;
    content: string;
  }): Promise<Instruction>;

  getById(id: string): Promise<Instruction | null>;

  listByWorkspace(workspaceId: string): Promise<Instruction[]>;

  update(id: string, data: Partial<{
    name: string;
    content: string;
    refinedContent: string | null;
  }>): Promise<Instruction | null>;

  softDelete(id: string): Promise<void>;

  linkToAssistant(assistantId: string, instructionId: string): Promise<void>;
}
