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
