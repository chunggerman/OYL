import {
  Thread,
  CreateThreadInput,
  UpdateThreadInput,
} from "../domain/entities/Thread";
import { ThreadRepository } from "../domain/repositories/ThreadRepository";

export class ThreadService {
  constructor(private readonly repo: ThreadRepository) {}

  listByWorkspace(workspaceId: string): Promise<Thread[]> {
    return this.repo.listByWorkspace(workspaceId);
  }

  create(input: CreateThreadInput): Promise<Thread> {
    return this.repo.create(input);
  }

  get(id: string): Promise<Thread | null> {
    return this.repo.getById(id);
  }

  update(id: string, input: UpdateThreadInput): Promise<Thread | null> {
    return this.repo.update(id, input);
  }

  delete(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}
