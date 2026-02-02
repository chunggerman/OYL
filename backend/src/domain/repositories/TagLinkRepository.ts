import { TagLink } from "../entities/TagLink";

export interface TagLinkRepository {
  findById(id: string): Promise<TagLink | null>;
  findByChunk(chunkId: string): Promise<TagLink[]>;
  create(tagLink: TagLink): Promise<void>;
}
