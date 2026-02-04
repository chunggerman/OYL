// backend/src/services/EmbeddingService.ts

export class EmbeddingService {
  constructor() {
    // No dependencies required for now.
    // Add modelClient or DB clients here later when needed.
  }

  async listByChunk(chunkId: string, workspaceId: string) {
    // TODO: replace with real DB query
    return [];
  }

  async get(id: string, workspaceId: string) {
    // TODO: replace with real DB query
    return null;
  }

  async create(workspaceId: string, chunkId: string, vector: number[]) {
    // TODO: replace with real DB insert
    return {
      id: "temp-id",
      workspaceId,
      chunkId,
      vector
    };
  }

  async delete(id: string, workspaceId: string) {
    // TODO: replace with real DB delete
    return;
  }
}
