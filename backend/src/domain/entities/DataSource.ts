export interface DataSource {
  id: string;
  workspaceId: string;
  name: string;
  schemaJson: any | null;
  rowCount: number | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
