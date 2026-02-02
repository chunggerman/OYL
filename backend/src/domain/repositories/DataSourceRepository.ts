import { DataSource } from "../entities/DataSource";

export interface DataSourceRepository {
  findById(id: string): Promise<DataSource | null>;
  findByWorkspace(workspaceId: string): Promise<DataSource[]>;
  create(dataSource: DataSource): Promise<void>;
}
