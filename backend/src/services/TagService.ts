import { PostgresTagRepository } from "../repositories/PostgresTagRepository";
import { PostgresDocumentTagRepository } from "../repositories/PostgresDocumentTagRepository";

export class TagService {
  private repo: PostgresTagRepository;
  private documentTagRepo: PostgresDocumentTagRepository;

  constructor() {
    this.repo = new PostgresTagRepository();
    this.documentTagRepo = new PostgresDocumentTagRepository();
  }

  async list(workspaceId: string) {
    return this.repo.listByWorkspace(workspaceId);
  }

  async get(id: string, workspaceId: string) {
    return this.repo.getById(id, workspaceId);
  }

  async create(
    workspaceId: string,
    name: string,
    color: string | null
  ) {
    return this.repo.create(workspaceId, name, color);
  }

  async update(
    id: string,
    workspaceId: string,
    name: string,
    color: string | null
  ) {
    return this.repo.update(id, workspaceId, name, color);
  }

  async delete(id: string, workspaceId: string) {
    await this.documentTagRepo.deleteByTag(id, workspaceId);
    await this.repo.delete(id, workspaceId);
  }
}
