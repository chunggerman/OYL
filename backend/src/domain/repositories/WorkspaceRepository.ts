import { Workspace } from "../entities/Workspace";

export interface WorkspaceRepository {
  findById(id: string): Promise<Workspace | null>;
  findByTenant(tenantId: string): Promise<Workspace[]>;
  create(workspace: Workspace): Promise<void>;
}
