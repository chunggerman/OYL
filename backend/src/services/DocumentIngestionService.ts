import { DocumentService } from "./DocumentService";
import { ChunkService } from "./ChunkService";
import { EmbeddingService } from "./EmbeddingService";
import { EmbeddingModelClient } from "./EmbeddingService";

export class DocumentIngestionService {
  private documentService: DocumentService;
  private chunkService: ChunkService;
  private embeddingService: EmbeddingService;

  constructor(modelClient: EmbeddingModelClient) {
    this.documentService = new DocumentService();
    this.chunkService = new ChunkService();
    this.embeddingService = new EmbeddingService(modelClient);
  }

  async ingestDocument(params: {
    workspaceId: string;
    referenceId?: string | null;
    title: string;
    content: string;
    chunkSize?: number;
  }): Promise<{ documentId: string }> {
    const document = await this.documentService.createDocument({
      workspaceId: params.workspaceId,
      referenceId: params.referenceId ?? null,
      title: params.title,
      content: params.content,
    });

    const chunkSize = params.chunkSize ?? 800;
    const chunks = this.chunkText(params.content, chunkSize);

    let position = 0;
    for (const text of chunks) {
      position += 1;

      const chunk = await this.chunkService.createChunk({
        documentId: document.id,
        position,
        text,
      });

      await this.embeddingService.createEmbeddingForChunk({
        documentId: document.id,
        chunkId: chunk.id,
      });
    }

    return { documentId: document.id };
  }

  private chunkText(text: string, size: number): string[] {
    const parts: string[] = [];
    let current = 0;
    while (current < text.length) {
      parts.push(text.slice(current, current + size));
      current += size;
    }
    return parts;
  }
}
