import {
  Workspace,
  CreateWorkspaceInput,
  UpdateWorkspaceInput,
} from "../domain/entities/Workspace";
import { WorkspaceRepository } from "../domain/repositories/WorkspaceRepository";

export class WorkspaceService {
  constructor(private readonly repo: WorkspaceRepository) {}

  listByUser(userId: string): Promise<Workspace[]> {
    return this.repo.listByUser(userId);
  }

  create(input: CreateWorkspaceInput): Promise<Workspace> {
    return this.repo.create(input);
  }

  get(id: string): Promise<Workspace | null> {
    return this.repo.getById(id);
  }

  update(id: string, input: UpdateWorkspaceInput): Promise<Workspace | null> {
    return this.repo.update(id, input);
  }

  delete(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}
