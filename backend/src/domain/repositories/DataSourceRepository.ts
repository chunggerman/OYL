import {
  Datasource,
  CreateDatasourceInput,
  UpdateDatasourceInput,
} from "../entities/Datasource";

export interface DatasourceRepository {
  listByWorkspace(workspaceId: string): Promise<Datasource[]>;
  create(input: CreateDatasourceInput): Promise<Datasource>;
  getById(id: string): Promise<Datasource | null>;
  update(id: string, input: UpdateDatasourceInput): Promise<Datasource | null>;
  delete(id: string): Promise<void>;
}
