export class TenantRepository {
  async createTenant(name: string, metadataEncrypted: Record<string, any> | null) {
    // TODO: replace with real DB logic
    return { id: "temp-id", name, metadataEncrypted };
  }

  async getAllTenants() {
    // TODO: replace with real DB logic
    return [];
  }

  async getTenantById(id: string) {
    // TODO: replace with real DB logic
    return { id, name: "temp", metadataEncrypted: null };
  }

  async updateTenant(id: string, name: string) {
    // TODO: replace with real DB logic
    return { id, name, metadataEncrypted: null };
  }

  async deleteTenant(id: string) {
    // TODO: replace with real DB logic
    return;
  }
}
