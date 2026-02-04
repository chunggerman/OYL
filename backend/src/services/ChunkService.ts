// backend/src/services/ChunkService.ts

export class ChunkService {
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

  async create(workspaceId: string, content: string) {
    // TODO: replace with real DB insert
    return {
      id: "temp-id",
      workspaceId,
      content
    };
  }

  async update(id: string, workspaceId: string, content: string) {
    // TODO: replace with real DB update
    return {
      id,
      workspaceId,
      content
    };
  }

  async delete(id: string, workspaceId: string) {
    // TODO: replace with real DB delete
    return;
  }
}
