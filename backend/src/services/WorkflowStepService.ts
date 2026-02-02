import { WorkflowStepRepository } from "../domain/repositories/WorkflowStepRepository";
import { WorkflowStep } from "../domain/entities/WorkflowStep";

export class WorkflowStepService {
  constructor(private readonly repo: WorkflowStepRepository) {}

  async getStep(id: string): Promise<WorkflowStep | null> {
    return this.repo.findById(id);
  }

  async getByWorkflow(workflowId: string): Promise<WorkflowStep[]> {
    return this.repo.findByWorkflow(workflowId);
  }

  async createStep(step: WorkflowStep): Promise<void> {
    await this.repo.create(step);
  }
}
