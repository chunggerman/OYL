import { DataSourceRepository } from "../domain/repositories/DataSourceRepository";
import { DataSource } from "../domain/entities/DataSource";

export class DataSourceService {
  constructor(private readonly repo: DataSourceRepository) {}

  async getDataSource(id: string): Promise<DataSource | null> {
    return this.repo.findById(id);
  }

  async getByWorkspace(workspaceId: string): Promise<DataSource[]> {
    return this.repo.findByWorkspace(workspaceId);
  }

  async createDataSource(dataSource: DataSource): Promise<void> {
    await this.repo.create(dataSource);
  }
}
