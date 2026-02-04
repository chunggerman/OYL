import {
  Embedding,
  CreateEmbeddingInput,
  UpdateEmbeddingInput,
} from "../entities/Embedding";

export interface EmbeddingRepository {
  listByChunk(chunkId: string): Promise<Embedding[]>;
  listByMessage(messageId: string): Promise<Embedding[]>;
  create(input: CreateEmbeddingInput): Promise<Embedding>;
  getById(id: string): Promise<Embedding | null>;
  update(id: string, input: UpdateEmbeddingInput): Promise<Embedding | null>;
  delete(id: string): Promise<void>;
}
