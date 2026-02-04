export interface Workspace {
  id: string;
  ownerId: string;
  name: string;
  metadata: any | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateWorkspaceInput {
  ownerId: string;
  name: string;
  metadata?: any | null;
}

export interface UpdateWorkspaceInput {
  name?: string;
  metadata?: any | null;
}
