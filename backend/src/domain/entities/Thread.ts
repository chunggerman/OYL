export interface Thread {
  id: string;
  workspaceId: string;
  title: string;
  metadata: any | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateThreadInput {
  workspaceId: string;
  title: string;
  metadata?: any | null;
}

export interface UpdateThreadInput {
  title?: string;
  metadata?: any | null;
}
