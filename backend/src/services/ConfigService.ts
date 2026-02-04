// backend/src/services/ConfigService.ts

export class ConfigService {
  constructor() {
    // Add DB/model clients here later if needed
  }

  async list(workspaceId: string) {
    // TODO: replace with real DB query
    return [];
  }

  async get(workspaceId: string, key: string) {
    // TODO: replace with real DB query
    return null;
  }

  async set(workspaceId: string, key: string, value: any) {
    // TODO: replace with real DB insert/update
    return {
      workspaceId,
      key,
      value
    };
  }

  async delete(workspaceId: string, key: string) {
    // TODO: replace with real DB delete
    return;
  }
}
