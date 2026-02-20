// backend/src/domain/entities/IngestionJob.ts

export interface Ingestion {
  id: string;
  datasourceId: string;
  status: string;
  errorMessage: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateIngestionInput {
  datasourceId: string;
}

export interface UpdateIngestionStatusInput {
  status: string;
  errorMessage?: string | null;
}
