export interface Document {
  id: string;
  workspaceId: string;
  referenceId: string | null;
  title: string;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
