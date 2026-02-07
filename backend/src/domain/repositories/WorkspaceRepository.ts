// backend/src/domain/repositories/WorkspaceRepository.ts

import {
  Workspace,
  CreateWorkspaceInput,
  UpdateWorkspaceInput,
} from "../entities/Workspace";

export interface WorkspaceRepository {
  // NOTE: userId here is actually tenantId in our schema
  listByUser(userId: string): Promise<Workspace[]>;
  create(input: CreateWorkspaceInput): Promise<Workspace>;
  getById(id: string): Promise<Workspace | null>;
  update(id: string, input: UpdateWorkspaceInput): Promise<Workspace | null>;
  delete(id: string): Promise<void>;
}
