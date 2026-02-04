export interface Config {
  id: string;
  workspaceId: string;
  key: string;
  value: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateConfigInput {
  workspaceId: string;
  key: string;
  value: any;
}

export interface UpdateConfigInput {
  key?: string;
  value?: any;
}
