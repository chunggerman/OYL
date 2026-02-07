// backend/src/domain/entities/Workspace.ts

export interface Workspace {
  id: string;
  tenantId: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CreateWorkspaceInput {
  tenantId: string;
  name: string;
  description?: string | null;
}

export interface UpdateWorkspaceInput {
  name?: string;
  description?: string | null;
}
