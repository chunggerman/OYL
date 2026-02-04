export interface Tag {
  id: string;
  workspaceId: string;
  name: string;
  description: string | null;
  createdAt: Date;
}
