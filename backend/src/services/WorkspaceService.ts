import { WorkspaceRepository } from "../domain/repositories/WorkspaceRepository";
import { Workspace } from "../domain/entities/Workspace";

export class WorkspaceService {
  constructor(private readonly repo: WorkspaceRepository) {}

  async getWorkspace(id: string): Promise<Workspace | null> {
    return this.repo.findById(id);
  }

  async getByTenant(tenantId: string): Promise<Workspace[]> {
    return this.repo.findByTenant(tenantId);
  }

  async createWorkspace(workspace: Workspace): Promise<void> {
    await this.repo.create(workspace);
  }
}
