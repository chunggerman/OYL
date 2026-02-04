import {
  Embedding,
  CreateEmbeddingInput,
  UpdateEmbeddingInput,
} from "../domain/entities/Embedding";
import { EmbeddingRepository } from "../domain/repositories/EmbeddingRepository";

export class EmbeddingService {
  constructor(private readonly repo: EmbeddingRepository) {}

  listByChunk(chunkId: string): Promise<Embedding[]> {
    return this.repo.listByChunk(chunkId);
  }

  listByMessage(messageId: string): Promise<Embedding[]> {
    return this.repo.listByMessage(messageId);
  }

  create(input: CreateEmbeddingInput): Promise<Embedding> {
    return this.repo.create(input);
  }

  get(id: string): Promise<Embedding | null> {
    return this.repo.getById(id);
  }

  update(id: string, input: UpdateEmbeddingInput): Promise<Embedding | null> {
    return this.repo.update(id, input);
  }

  delete(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}
