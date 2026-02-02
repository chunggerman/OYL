import { Chunk } from "../entities/Chunk";

export interface ChunkRepository {
  findById(id: string): Promise<Chunk | null>;
  findByDocument(documentId: string): Promise<Chunk[]>;
  create(chunk: Chunk): Promise<void>;
}
