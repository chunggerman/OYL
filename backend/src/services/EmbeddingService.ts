import { EmbeddingRepository } from "../domain/repositories/EmbeddingRepository";
import { Embedding } from "../domain/entities/Embedding";

export class EmbeddingService {
  constructor(private readonly repo: EmbeddingRepository) {}

  async getEmbedding(id: string): Promise<Embedding | null> {
    return this.repo.findById(id);
  }

  async getByChunk(chunkId: string): Promise<Embedding[]> {
    return this.repo.findByChunk(chunkId);
  }

  async createEmbedding(embedding: Embedding): Promise<void> {
    await this.repo.create(embedding);
  }
}
