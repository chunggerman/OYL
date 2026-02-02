export interface Workspace {
  id: string;
  tenantId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
