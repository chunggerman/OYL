// backend/src/services/ValidationService.ts

export class ValidationService {
  constructor() {
    // Add DB/model clients here later if needed
  }

  async list(workspaceId: string) {
    // TODO: replace with real DB query
    return [];
  }

  async get(id: string, workspaceId: string) {
    // TODO: replace with real DB query
    return null;
  }

  async create(workspaceId: string, input: any) {
    // TODO: replace with real DB insert
    return {
      id: "temp-id",
      workspaceId,
      input
    };
  }

  async delete(id: string, workspaceId: string) {
    // TODO: replace with real DB delete
    return;
  }
}
