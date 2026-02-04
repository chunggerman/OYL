import {
  Thread,
  CreateThreadInput,
  UpdateThreadInput,
} from "../entities/Thread";

export interface ThreadRepository {
  listByWorkspace(workspaceId: string): Promise<Thread[]>;
  create(input: CreateThreadInput): Promise<Thread>;
  getById(id: string): Promise<Thread | null>;
  update(id: string, input: UpdateThreadInput): Promise<Thread | null>;
  delete(id: string): Promise<void>;
}
