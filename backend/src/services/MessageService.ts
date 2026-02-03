import { PostgresMessageRepository } from "../repositories/PostgresMessageRepository";
import { PostgresThreadRepository } from "../repositories/PostgresThreadRepository";

export class MessageService {
  private repo: PostgresMessageRepository;
  private threadRepo: PostgresThreadRepository;

  constructor() {
    this.repo = new PostgresMessageRepository();
    this.threadRepo = new PostgresThreadRepository();
  }

  async list(threadId: string, workspaceId: string) {
    return this.repo.listByThread(threadId, workspaceId);
  }

  async get(id: string, workspaceId: string) {
    return this.repo.getById(id, workspaceId);
  }

  async create(
    workspaceId: string,
    threadId: string,
    role: string,
    content: string
  ) {
    const message = await this.repo.create(
      workspaceId,
      threadId,
      role,
      content
    );

    await this.threadRepo.touch(threadId, workspaceId);

    return message;
  }

  async deleteByThread(threadId: string, workspaceId: string) {
    await this.repo.deleteByThread(threadId, workspaceId);
  }
}
