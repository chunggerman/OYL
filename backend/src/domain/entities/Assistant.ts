export interface Assistant {
  id: string;
  workspaceId: string;
  name: string;
  instruction: string | null;
  aiInstruction: string | null;
  settingsJson: Record<string, any> | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
