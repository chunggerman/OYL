import { PostgresDocumentRepository } from "../repositories/PostgresDocumentRepository";
import { PostgresChunkRepository } from "../repositories/PostgresChunkRepository";
import { PostgresEmbeddingRepository } from "../repositories/PostgresEmbeddingRepository";
import { PostgresValidationRepository } from "../repositories/PostgresValidationRepository";

export class DocumentService {
  private repo: PostgresDocumentRepository;
  private chunkRepo: PostgresChunkRepository;
  private embeddingRepo: PostgresEmbeddingRepository;
  private validationRepo: PostgresValidationRepository;

  constructor() {
    this.repo = new PostgresDocumentRepository();
    this.chunkRepo = new PostgresChunkRepository();
    this.embeddingRepo = new PostgresEmbeddingRepository();
    this.validationRepo = new PostgresValidationRepository();
  }

  async list(workspaceId: string) {
    return this.repo.listByWorkspace(workspaceId);
  }

  async get(id: string, workspaceId: string) {
    return this.repo.getById(id, workspaceId);
  }

  async create(
    workspaceId: string,
    title: string,
    source: string | null
  ) {
    return this.repo.create(workspaceId, title, source);
  }

  async update(
    id: string,
    workspaceId: string,
    title: string,
    source: string | null
  ) {
    return this.repo.update(id, workspaceId, title, source);
  }

  async delete(id: string, workspaceId: string) {
    const chunks = await this.chunkRepo.listByDocument(id, workspaceId);

    for (const chunk of chunks) {
      await this.embeddingRepo.deleteByChunk(chunk.id, workspaceId);
      await this.validationRepo.deleteByChunk(chunk.id, workspaceId);
    }

    await this.chunkRepo.deleteByDocument(id, workspaceId);
    await this.repo.delete(id, workspaceId);
  }
}
