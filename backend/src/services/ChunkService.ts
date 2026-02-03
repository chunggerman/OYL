import { ChunkRepository } from "../domain/repositories/ChunkRepository";
import { Chunk } from "../domain/entities/Chunk";
import { DocumentRepository } from "../domain/repositories/DocumentRepository";

export class ChunkService {
  private chunkRepository: ChunkRepository;
  private documentRepository: DocumentRepository;

  constructor(
    chunkRepository?: ChunkRepository,
    documentRepository?: DocumentRepository
  ) {
    this.chunkRepository = chunkRepository ?? new ChunkRepository();
    this.documentRepository = documentRepository ?? new DocumentRepository();
  }

  async createChunk(params: {
    documentId: string;
    position: number;
    text: string;
    tagsText?: string[] | null;
  }): Promise<Chunk> {
    const document = await this.documentRepository.findById(params.documentId);
    if (!document) {
      throw new Error("Document not found");
    }

    return this.chunkRepository.create({
      documentId: params.documentId,
      position: params.position,
      text: params.text,
      tagsText: params.tagsText ?? null,
    });
  }

  async listChunksByDocument(documentId: string): Promise<Chunk[]> {
    return this.chunkRepository.listByDocument(documentId);
  }

  async deleteChunksByDocument(documentId: string): Promise<void> {
    await this.chunkRepository.softDeleteByDocument(documentId);
  }
}
