import { TenantRepository } from "../domain/repositories/TenantRepository";
import { Tenant } from "../domain/entities/Tenant";

export class TenantService {
  constructor(private readonly repo: TenantRepository) {}

  async getTenant(id: string): Promise<Tenant | null> {
    return this.repo.findById(id);
  }

  async getMany(ids: string[]): Promise<Tenant[]> {
    return this.repo.findManyByIds(ids);
  }

  async createTenant(tenant: Tenant): Promise<void> {
    await this.repo.create(tenant);
  }
}
