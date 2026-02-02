import { WorkflowRepository } from "../domain/repositories/WorkflowRepository";
import { Workflow } from "../domain/entities/Workflow";

export class WorkflowService {
  constructor(private readonly repo: WorkflowRepository) {}

  async getWorkflow(id: string): Promise<Workflow | null> {
    return this.repo.findById(id);
  }

  async getByWorkspace(workspaceId: string): Promise<Workflow[]> {
    return this.repo.findByWorkspace(workspaceId);
  }

  async createWorkflow(workflow: Workflow): Promise<void> {
    await this.repo.create(workflow);
  }
}
