import { PostgresWorkflowStepRepository } from "../repositories/PostgresWorkflowStepRepository";

export class WorkflowStepService {
  private repo: PostgresWorkflowStepRepository;

  constructor() {
    this.repo = new PostgresWorkflowStepRepository();
  }

  async list(workflowId: string, workspaceId: string) {
    return this.repo.listByWorkflow(workflowId, workspaceId);
  }

  async get(id: string, workspaceId: string) {
    return this.repo.getById(id, workspaceId);
  }

  async create(
    workspaceId: string,
    workflowId: string,
    position: number,
    type: string,
    config: any
  ) {
    return this.repo.create(workspaceId, workflowId, position, type, config);
  }

  async update(
    id: string,
    workspaceId: string,
    position: number,
    type: string,
    config: any
  ) {
    return this.repo.update(id, workspaceId, position, type, config);
  }

  async delete(id: string, workspaceId: string) {
    await this.repo.delete(id, workspaceId);
  }
}
