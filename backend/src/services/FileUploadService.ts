import { PostgresDocumentRepository } from "../repositories/PostgresDocumentRepository";
import { PostgresChunkRepository } from "../repositories/PostgresChunkRepository";

export class FileUploadService {
  private documentRepo: PostgresDocumentRepository;
  private chunkRepo: PostgresChunkRepository;

  constructor() {
    this.documentRepo = new PostgresDocumentRepository();
    this.chunkRepo = new PostgresChunkRepository();
  }

  async createDocumentWithChunks(
    workspaceId: string,
    title: string,
    source: string | null,
    chunks: { content: string; index: number }[]
  ) {
    const document = await this.documentRepo.create(
      workspaceId,
      title,
      source
    );

    for (const chunk of chunks) {
      await this.chunkRepo.create(
        workspaceId,
        document.id,
        chunk.content,
        chunk.index
      );
    }

    return document;
  }
}
