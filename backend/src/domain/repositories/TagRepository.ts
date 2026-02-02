import { Tag } from "../entities/Tag";

export interface TagRepository {
  findById(id: string): Promise<Tag | null>;
  findByReference(referenceId: string): Promise<Tag[]>;
  create(tag: Tag): Promise<void>;
}
