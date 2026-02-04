export interface Datasource {
  id: string;
  workspaceId: string;
  name: string;
  type: string;
  config: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateDatasourceInput {
  workspaceId: string;
  name: string;
  type: string;
  config?: any;
}

export interface UpdateDatasourceInput {
  name?: string;
  type?: string;
  config?: any;
}
