import { PostgresDataSourceRepository } from "../repositories/PostgresDataSourceRepository";

export class DataSourceService {
  private repo: PostgresDataSourceRepository;

  constructor() {
    this.repo = new PostgresDataSourceRepository();
  }

  async list(workspaceId: string) {
    return this.repo.listByWorkspace(workspaceId);
  }

  async get(id: string, workspaceId: string) {
    return this.repo.getById(id, workspaceId);
  }

  async create(
    workspaceId: string,
    type: string,
    config: any
  ) {
    return this.repo.create(workspaceId, type, config);
  }

  async update(
    id: string,
    workspaceId: string,
    type: string,
    config: any
  ) {
    return this.repo.update(id, workspaceId, type, config);
  }

  async delete(id: string, workspaceId: string) {
    await this.repo.delete(id, workspaceId);
  }
}
