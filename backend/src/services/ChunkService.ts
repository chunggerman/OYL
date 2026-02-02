import { ChunkRepository } from "../domain/repositories/ChunkRepository";
import { Chunk } from "../domain/entities/Chunk";

export class ChunkService {
  constructor(private readonly repo: ChunkRepository) {}

  async getChunk(id: string): Promise<Chunk | null> {
    return this.repo.findById(id);
  }

  async getByDocument(documentId: string): Promise<Chunk[]> {
    return this.repo.findByDocument(documentId);
  }

  async createChunk(chunk: Chunk): Promise<void> {
    await this.repo.create(chunk);
  }
}
