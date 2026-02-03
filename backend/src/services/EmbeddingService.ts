import { PostgresEmbeddingRepository } from "../repositories/PostgresEmbeddingRepository";

export class EmbeddingService {
  private repo: PostgresEmbeddingRepository;

  constructor() {
    this.repo = new PostgresEmbeddingRepository();
  }

  async listByChunk(chunkId: string, workspaceId: string) {
    return this.repo.listByChunk(chunkId, workspaceId);
  }

  async get(id: string, workspaceId: string) {
    return this.repo.getById(id, workspaceId);
  }

  async create(
    workspaceId: string,
    chunkId: string,
    vector: number[],
    model: string
  ) {
    return this.repo.create(workspaceId, chunkId, vector, model);
  }

  async deleteByChunk(chunkId: string, workspaceId: string) {
    await this.repo.deleteByChunk(chunkId, workspaceId);
  }
}
