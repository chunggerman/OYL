import { PostgresThreadRepository } from "../repositories/PostgresThreadRepository";
import { PostgresMessageRepository } from "../repositories/PostgresMessageRepository";

export class ThreadService {
  private repo: PostgresThreadRepository;
  private messageRepo: PostgresMessageRepository;

  constructor() {
    this.repo = new PostgresThreadRepository();
    this.messageRepo = new PostgresMessageRepository();
  }

  async list(workspaceId: string) {
    return this.repo.listByWorkspace(workspaceId);
  }

  async get(id: string, workspaceId: string) {
    return this.repo.getById(id, workspaceId);
  }

  async create(
    workspaceId: string,
    title: string | null
  ) {
    return this.repo.create(workspaceId, title);
  }

  async updateTitle(
    id: string,
    workspaceId: string,
    title: string | null
  ) {
    return this.repo.updateTitle(id, workspaceId, title);
  }

  async delete(id: string, workspaceId: string) {
    await this.messageRepo.deleteByThread(id, workspaceId);
    await this.repo.delete(id, workspaceId);
  }
}
