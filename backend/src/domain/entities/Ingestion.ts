export interface Ingestion {
  id: string;
  datasourceId: string;
  status: "pending" | "processing" | "completed" | "failed";
  errorMessage: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateIngestionInput {
  datasourceId: string;
}

export interface UpdateIngestionStatusInput {
  status: "pending" | "processing" | "completed" | "failed";
  errorMessage?: string | null;
}
