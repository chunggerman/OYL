import {
  Ingestion,
  CreateIngestionInput,
  UpdateIngestionStatusInput,
} from "../domain/entities/Ingestion";
import { IngestionRepository } from "../domain/repositories/IngestionRepository";

export class IngestionService {
  constructor(private readonly repo: IngestionRepository) {}

  listByDatasource(datasourceId: string): Promise<Ingestion[]> {
    return this.repo.listByDatasource(datasourceId);
  }

  create(input: CreateIngestionInput): Promise<Ingestion> {
    return this.repo.create(input);
  }

  get(id: string): Promise<Ingestion | null> {
    return this.repo.getById(id);
  }

  updateStatus(id: string, input: UpdateIngestionStatusInput): Promise<Ingestion | null> {
    return this.repo.updateStatus(id, input);
  }

  delete(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}
