import {
  Workspace,
  CreateWorkspaceInput,
  UpdateWorkspaceInput,
} from "../entities/Workspace";

export interface WorkspaceRepository {
  listByUser(userId: string): Promise<Workspace[]>;
  create(input: CreateWorkspaceInput): Promise<Workspace>;
  getById(id: string): Promise<Workspace | null>;
  update(id: string, input: UpdateWorkspaceInput): Promise<Workspace | null>;
  delete(id: string): Promise<void>;
}
