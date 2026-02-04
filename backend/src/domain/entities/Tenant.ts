export interface Tenant {
  id: string;
  ownerId: string;
  name: string;
  metadata: any | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTenantInput {
  ownerId: string;
  name: string;
  metadata?: any | null;
}

export interface UpdateTenantInput {
  name?: string;
  metadata?: any | null;
}
