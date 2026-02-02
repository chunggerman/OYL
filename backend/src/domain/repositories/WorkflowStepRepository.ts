import { WorkflowStep } from "../entities/WorkflowStep";

export interface WorkflowStepRepository {
  findById(id: string): Promise<WorkflowStep | null>;
  findByWorkflow(workflowId: string): Promise<WorkflowStep[]>;
  create(step: WorkflowStep): Promise<void>;
}
