//backend/src/services/WorkspaceService.ts
import {
  Workspace,
  CreateWorkspaceInput,
  UpdateWorkspaceInput,
} from "../domain/entities/Workspace";
import { WorkspaceRepository } from "../domain/repositories/WorkspaceRepository";

export class WorkspaceService {
  constructor(private repo: WorkspaceRepository) {}

  async getById(id: string): Promise<Workspace | null> {
    return this.repo.getById(id);
  }

  async listByUser(userId: string): Promise<Workspace[]> {
    return this.repo.listByUser(userId);
  }

  async create(input: CreateWorkspaceInput): Promise<Workspace> {
    return this.repo.create(input);
  }

  async update(
    id: string,
    input: UpdateWorkspaceInput
  ): Promise<Workspace | null> {
    return this.repo.update(id, input);
  }

  async delete(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}
