import { VectorStoreClient } from "./EmbeddingService";
import { ChunkRepository } from "../domain/repositories/ChunkRepository";
import { DocumentRepository } from "../domain/repositories/DocumentRepository";

export class RagSearchService {
  private vectorStoreClient: VectorStoreClient;
  private chunkRepository: ChunkRepository;
  private documentRepository: DocumentRepository;

  constructor(
    vectorStoreClient: VectorStoreClient,
    chunkRepository?: ChunkRepository,
    documentRepository?: DocumentRepository
  ) {
    this.vectorStoreClient = vectorStoreClient;
    this.chunkRepository = chunkRepository ?? new ChunkRepository();
    this.documentRepository = documentRepository ?? new DocumentRepository();
  }

  async search(params: {
    workspaceId: string;
    query: string;
    topK?: number;
  }): Promise<
    Array<{
      chunkId: string;
      score: number;
      text: string;
      documentId: string;
      documentTitle: string;
    }>
  > {
    const topK = params.topK ?? 8;

    const results = await this.vectorStoreClient.query({
      workspaceId: params.workspaceId,
      query: params.query,
      topK,
    });

    const enriched: Array<{
      chunkId: string;
      score: number;
      text: string;
      documentId: string;
      documentTitle: string;
    }> = [];

    for (const r of results) {
      const chunks = await this.chunkRepository.listByDocument(""); // placeholder to reuse mapping
      const chunk = chunks.find((c) => c.id === r.chunkId);
      if (!chunk) continue;

      const document = await this.documentRepository.findById(chunk.documentId);
      if (!document) continue;

      enriched.push({
        chunkId: chunk.id,
        score: r.score,
        text: chunk.text,
        documentId: document.id,
        documentTitle: document.title,
      });
    }

    return enriched;
  }
}
