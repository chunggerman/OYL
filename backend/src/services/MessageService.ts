// backend/src/services/MessageService.ts

export class MessageService {
  constructor() {
    // Add DB/model clients here later if needed
  }

  async list(threadId: string, workspaceId: string) {
    // TODO: replace with real DB query
    return [];
  }

  async get(id: string, workspaceId: string) {
    // TODO: replace with real DB query
    return null;
  }

  async create(workspaceId: string, threadId: string, content: string) {
    // TODO: replace with real DB insert
    return {
      id: "temp-id",
      workspaceId,
      threadId,
      content
    };
  }

  async delete(id: string, workspaceId: string) {
    // TODO: replace with real DB delete
    return;
  }
}
