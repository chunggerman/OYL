import {
  Datasource,
  CreateDatasourceInput,
  UpdateDatasourceInput,
} from "../domain/entities/Datasource";
import { DatasourceRepository } from "../domain/repositories/DatasourceRepository";

export class DatasourceService {
  constructor(private readonly repo: DatasourceRepository) {}

  listByWorkspace(workspaceId: string): Promise<Datasource[]> {
    return this.repo.listByWorkspace(workspaceId);
  }

  create(input: CreateDatasourceInput): Promise<Datasource> {
    return this.repo.create(input);
  }

  get(id: string): Promise<Datasource | null> {
    return this.repo.getById(id);
  }

  update(id: string, input: UpdateDatasourceInput): Promise<Datasource | null> {
    return this.repo.update(id, input);
  }

  delete(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}
