export interface Tag {
  id: string;
  workspaceId: string;
  name: string;
  color: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTagInput {
  workspaceId: string;
  name: string;
  color?: string | null;
}

export interface UpdateTagInput {
  name?: string;
  color?: string | null;
}
