// backend/src/domain/entities/Instruction.ts

export interface Instruction {
  id: string;
  workspaceId: string;

  name: string;
  content: string;
  refinedContent: string | null;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
