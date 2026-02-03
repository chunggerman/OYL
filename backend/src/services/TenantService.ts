import { TenantRepository } from "../domain/repositories/TenantRepository";
import { Tenant } from "../domain/entities/Tenant";

export class TenantService {
  private tenantRepository: TenantRepository;

  constructor(tenantRepository?: TenantRepository) {
    this.tenantRepository = tenantRepository ?? new TenantRepository();
  }

  async createTenant(name: string, metadataEncrypted: Record<string, any> | null): Promise<Tenant> {
    return this.tenantRepository.create(name, metadataEncrypted);
  }

  async getTenantById(id: string): Promise<Tenant | null> {
    return this.tenantRepository.findById(id);
  }

  async listTenants(): Promise<Tenant[]> {
    return this.tenantRepository.list();
  }

  async deleteTenant(id: string): Promise<void> {
    await this.tenantRepository.softDelete(id);
  }
}
