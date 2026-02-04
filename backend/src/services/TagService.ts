// backend/src/services/TagService.ts

export class TagService {
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

  async create(workspaceId: string, name: string) {
    // TODO: replace with real DB insert
    return {
      id: "temp-id",
      workspaceId,
      name
    };
  }

  async update(id: string, workspaceId: string, name: string) {
    // TODO: replace with real DB update
    return {
      id,
      workspaceId,
      name
    };
  }

  async delete(id: string, workspaceId: string) {
    // TODO: replace with real DB delete
    return;
  }
}
