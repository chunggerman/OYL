export interface Integration {
  id: string;
  workspaceId: string;
  provider: string;
  config: any;
  status: "active" | "inactive" | "error";
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateIntegrationInput {
  workspaceId: string;
  provider: string;
  config?: any;
}

export interface UpdateIntegrationInput {
  provider?: string;
  config?: any;
  status?: "active" | "inactive" | "error";
}
