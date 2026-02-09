// backend/src/domain/entities/Assistant.ts

export interface Assistant {
  id: string;
  workspaceId: string;
  name: string;
  instruction: string | null;
  aiInstruction: string | null;
  settingsJson: any | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CreateAssistantInput {
  workspaceId: string;
  name: string;
  instruction?: string | null;
  aiInstruction?: string | null;
  settingsJson?: any | null;
}

export interface UpdateAssistantInput {
  name?: string;
  instruction?: string | null;
  aiInstruction?: string | null;
  settingsJson?: any | null;
}
