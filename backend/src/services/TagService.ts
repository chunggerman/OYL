import {
  Tag,
  CreateTagInput,
  UpdateTagInput,
} from "../domain/entities/Tag";
import { TagRepository } from "../domain/repositories/TagRepository";

export class TagService {
  constructor(private readonly repo: TagRepository) {}

  listByWorkspace(workspaceId: string): Promise<Tag[]> {
    return this.repo.listByWorkspace(workspaceId);
  }

  create(input: CreateTagInput): Promise<Tag> {
    return this.repo.create(input);
  }

  get(id: string): Promise<Tag | null> {
    return this.repo.getById(id);
  }

  update(id: string, input: UpdateTagInput): Promise<Tag | null> {
    return this.repo.update(id, input);
  }

  delete(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}
