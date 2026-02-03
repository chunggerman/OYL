import { PostgresChunkRepository } from "../repositories/PostgresChunkRepository";
import { PostgresEmbeddingRepository } from "../repositories/PostgresEmbeddingRepository";
import { PostgresValidationRepository } from "../repositories/PostgresValidationRepository";

export class ChunkService {
  private repo: PostgresChunkRepository;
  private embeddingRepo: PostgresEmbeddingRepository;
  private validationRepo: PostgresValidationRepository;

  constructor() {
    this.repo = new PostgresChunkRepository();
    this.embeddingRepo = new PostgresEmbeddingRepository();
    this.validationRepo = new PostgresValidationRepository();
  }

  async listByDocument(documentId: string, workspaceId: string) {
    return this.repo.listByDocument(documentId, workspaceId);
  }

  async get(id: string, workspaceId: string) {
    return this.repo.getById(id, workspaceId);
  }

  async create(
    workspaceId: string,
    documentId: string,
    content: string,
    index: number
  ) {
    return this.repo.create(workspaceId, documentId, content, index);
  }

  async update(
    id: string,
    workspaceId: string,
    content: string,
    index: number
  ) {
    return this.repo.update(id, workspaceId, content, index);
  }

  async delete(id: string, workspaceId: string) {
    await this.embeddingRepo.deleteByChunk(id, workspaceId);
    await this.validationRepo.deleteByChunk(id, workspaceId);
    await this.repo.delete(id, workspaceId);
  }

  async deleteByDocument(documentId: string, workspaceId: string) {
    const chunks = await this.repo.listByDocument(documentId, workspaceId);

    for (const chunk of chunks) {
      await this.embeddingRepo.deleteByChunk(chunk.id, workspaceId);
      await this.validationRepo.deleteByChunk(chunk.id, workspaceId);
    }

    await this.repo.deleteByDocument(documentId, workspaceId);
  }
}
