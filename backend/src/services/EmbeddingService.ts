import { EmbeddingRepository } from "../domain/repositories/EmbeddingRepository";
import { ChunkRepository } from "../domain/repositories/ChunkRepository";
import { Embedding } from "../domain/entities/Embedding";

export interface VectorStoreClient {
  upsertEmbedding(params: {
    workspaceId: string;
    documentId: string;
    chunkId: string;
    text: string;
  }): Promise<string>;

  query(params: {
    workspaceId: string;
    query: string;
    topK: number;
  }): Promise<
    Array<{
      chunkId: string;
      score: number;
    }>
  >;
}

export class EmbeddingService {
  private embeddingRepository: EmbeddingRepository;
  private chunkRepository: ChunkRepository;
  private vectorStoreClient: VectorStoreClient;

  constructor(
    vectorStoreClient: VectorStoreClient,
    embeddingRepository?: EmbeddingRepository,
    chunkRepository?: ChunkRepository
  ) {
    this.vectorStoreClient = vectorStoreClient;
    this.embeddingRepository = embeddingRepository ?? new EmbeddingRepository();
    this.chunkRepository = chunkRepository ?? new ChunkRepository();
  }

  async createEmbeddingForChunk(params: {
    workspaceId: string;
    documentId: string;
    chunkId: string;
  }): Promise<Embedding> {
    const chunk = await this.chunkRepository.listByDocument(params.documentId);
    const target = chunk.find((c) => c.id === params.chunkId);
    if (!target) {
      throw new Error("Chunk not found for embedding");
    }

    const vectorRef = await this.vectorStoreClient.upsertEmbedding({
      workspaceId: params.workspaceId,
      documentId: params.documentId,
      chunkId: params.chunkId,
      text: target.text,
    });

    return this.embeddingRepository.create({
      chunkId: params.chunkId,
      vectorRef,
    });
  }
}
