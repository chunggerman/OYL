import { TagLinkRepository } from "../domain/repositories/TagLinkRepository";
import { TagLink } from "../domain/entities/TagLink";

export class TagLinkService {
  constructor(private readonly repo: TagLinkRepository) {}

  async getTagLink(id: string): Promise<TagLink | null> {
    return this.repo.findById(id);
  }

  async getByChunk(chunkId: string): Promise<TagLink[]> {
    return this.repo.findByChunk(chunkId);
  }

  async createTagLink(tagLink: TagLink): Promise<void> {
    await this.repo.create(tagLink);
  }
}
