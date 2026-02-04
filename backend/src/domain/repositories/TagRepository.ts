import {
  Tag,
  CreateTagInput,
  UpdateTagInput,
} from "../entities/Tag";

export interface TagRepository {
  listByWorkspace(workspaceId: string): Promise<Tag[]>;
  create(input: CreateTagInput): Promise<Tag>;
  getById(id: string): Promise<Tag | null>;
  update(id: string, input: UpdateTagInput): Promise<Tag | null>;
  delete(id: string): Promise<void>;
}
