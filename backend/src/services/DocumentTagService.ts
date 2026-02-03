import { PostgresDocumentTagRepository } from "../repositories/PostgresDocumentTagRepository";

export class DocumentTagService {
  private repo: PostgresDocumentTagRepository;

  constructor() {
    this.repo = new PostgresDocumentTagRepository();
  }

  async listByDocument(documentId: string, workspaceId: string) {
    return this.repo.listByDocument(documentId, workspaceId);
  }

  async listByTag(tagId: string, workspaceId: string) {
    return this.repo.listByTag(tagId, workspaceId);
  }

  async get(id: string, workspaceId: string) {
    return this.repo.getById(id, workspaceId);
  }

  async create(
    workspaceId: string,
    documentId: string,
    tagId: string
  ) {
    return this.repo.create(workspaceId, documentId, tagId);
  }

  async delete(id: string, workspaceId: string) {
    await this.repo.delete(id, workspaceId);
  }

  async deleteByDocument(documentId: string, workspaceId: string) {
    await this.repo.deleteByDocument(documentId, workspaceId);
  }

  async deleteByTag(tagId: string, workspaceId: string) {
    await this.repo.deleteByTag(tagId, workspaceId);
  }
}
