import { TenantRepository } from "../domain/repositories/TenantRepository";

export class TenantService {
  private repo: TenantRepository;

  constructor() {
    this.repo = new TenantRepository();
  }

  async createTenant(name: string, metadataEncrypted: Record<string, any> | null) {
    return this.repo.createTenant(name, metadataEncrypted);
  }

  async getAllTenants() {
    return this.repo.getAllTenants();
  }

  async getTenantById(id: string) {
    return this.repo.getTenantById(id);
  }

  async updateTenant(id: string, name: string) {
    return this.repo.updateTenant(id, name);
  }

  async deleteTenant(id: string) {
    return this.repo.deleteTenant(id);
  }
}
