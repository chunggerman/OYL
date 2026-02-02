import { Workflow } from "../entities/Workflow";

export interface WorkflowRepository {
  findById(id: string): Promise<Workflow | null>;
  findByWorkspace(workspaceId: string): Promise<Workflow[]>;
  create(workflow: Workflow): Promise<void>;
}
