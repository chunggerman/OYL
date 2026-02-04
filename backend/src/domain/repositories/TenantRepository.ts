export class TenantRepository {
  async createTenant(name: string, metadataEncrypted: Record<string, any> | null) {
    return {
      id: "temp-id",
      name,
      metadataEncrypted
    };
  }

  async getAllTenants() {
    return [];
  }

  async getTenantById(id: string) {
    return {
      id,
      name: "temp",
      metadataEncrypted: null
    };
  }

  async updateTenant(id: string, name: string) {
    return {
      id,
      name,
      metadataEncrypted: null
    };
  }

  async deleteTenant(id: string) {
    return;
  }
}
