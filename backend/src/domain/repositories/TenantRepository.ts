import {
  Tenant,
  CreateTenantInput,
  UpdateTenantInput,
} from "../entities/Tenant";

export interface TenantRepository {
  listByOwner(ownerId: string): Promise<Tenant[]>;
  create(input: CreateTenantInput): Promise<Tenant>;
  getById(id: string): Promise<Tenant | null>;
  update(id: string, input: UpdateTenantInput): Promise<Tenant | null>;
  delete(id: string): Promise<void>;
}
