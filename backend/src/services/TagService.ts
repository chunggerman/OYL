import { TagRepository } from "../domain/repositories/TagRepository";
import { Tag } from "../domain/entities/Tag";

export class TagService {
  constructor(private readonly repo: TagRepository) {}

  async getTag(id: string): Promise<Tag | null> {
    return this.repo.findById(id);
  }

  async getByReference(referenceId: string): Promise<Tag[]> {
    return this.repo.findByReference(referenceId);
  }

  async createTag(tag: Tag): Promise<void> {
    await this.repo.create(tag);
  }
}
