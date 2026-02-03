export interface Tenant {
  id: string;
  name: string;
  metadataEncrypted: Record<string, any> | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
