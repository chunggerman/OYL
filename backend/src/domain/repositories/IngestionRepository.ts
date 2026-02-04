import {
  Ingestion,
  CreateIngestionInput,
  UpdateIngestionStatusInput,
} from "../entities/Ingestion";

export interface IngestionRepository {
  listByDatasource(datasourceId: string): Promise<Ingestion[]>;
  create(input: CreateIngestionInput): Promise<Ingestion>;
  getById(id: string): Promise<Ingestion | null>;
  updateStatus(id: string, input: UpdateIngestionStatusInput): Promise<Ingestion | null>;
  delete(id: string): Promise<void>;
}
