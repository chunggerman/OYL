// backend/src/services/ThreadService.ts

export class ThreadService {
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

  async create(workspaceId: string, title: string) {
    // TODO: replace with real DB insert
    return {
      id: "temp-id",
      workspaceId,
      title
    };
  }

  async update(id: string, workspaceId: string, title: string) {
    // TODO: replace with real DB update
    return {
      id,
      workspaceId,
      title
    };
  }

  async delete(id: string, workspaceId: string) {
    // TODO: replace with real DB delete
    return;
  }
}
