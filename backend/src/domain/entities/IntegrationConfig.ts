export type IntegrationType = "REST" | "SQL";

export interface IntegrationConfig {
  id: string;
  workspaceId: string;
  typeEnum: IntegrationType;
  configEncryptedJson: any;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
