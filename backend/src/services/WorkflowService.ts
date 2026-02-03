import { WorkspaceRepository } from "../domain/repositories/WorkspaceRepository";
import { Workspace } from "../domain/entities/Workspace";
import { TenantRepository } from "../domain/repositories/TenantRepository";

export class WorkspaceService {
  private workspaceRepository: WorkspaceRepository;
  private tenantRepository: TenantRepository;

  constructor(
    workspaceRepository?: WorkspaceRepository,
    tenantRepository?: TenantRepository
  ) {
    this.workspaceRepository = workspaceRepository ?? new WorkspaceRepository();
    this.tenantRepository = tenantRepository ?? new TenantRepository();
  }

  async createWorkspace(
    tenantId: string,
    name: string,
    description: string | null
  ): Promise<Workspace> {
    const tenant = await this.tenantRepository.findById(tenantId);
    if (!tenant) {
      throw new Error("Tenant not found");
    }
    return this.workspaceRepository.create(tenantId, name, description);
  }

  async getWorkspaceById(id: string): Promise<Workspace | null> {
    return this.workspaceRepository.findById(id);
  }

  async listWorkspacesByTenant(tenantId: string): Promise<Workspace[]> {
    return this.workspaceRepository.listByTenant(tenantId);
  }

  async deleteWorkspace(id: string): Promise<void> {
    await this.workspaceRepository.softDelete(id);
  }
}
