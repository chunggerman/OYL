import { Tenant } from "../entities/Tenant";

export interface TenantRepository {
  findById(id: string): Promise<Tenant | null>;
  findManyByIds(ids: string[]): Promise<Tenant[]>;
  create(tenant: Tenant): Promise<void>;
}
