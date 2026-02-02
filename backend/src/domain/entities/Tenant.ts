export interface Tenant {
  id: string;
  name: string;
  metadataJson: any | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
