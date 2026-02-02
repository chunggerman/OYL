export type WorkflowStepType = "ASSISTANT" | "HUMAN" | "INTEGRATION";

export interface WorkflowStep {
  id: string;
  workflowId: string;
  position: number;
  typeEnum: WorkflowStepType;
  assistantId: string | null;
  instruction: string | null;
  configJson: any | null;
  createdAt: Date;
  deletedAt: Date | null;
}
