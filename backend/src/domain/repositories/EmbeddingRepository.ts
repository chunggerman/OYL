import { Embedding } from "../entities/Embedding";

export interface EmbeddingRepository {
  findById(id: string): Promise<Embedding | null>;
  findByChunk(chunkId: string): Promise<Embedding[]>;
  create(embedding: Embedding): Promise<void>;
}
