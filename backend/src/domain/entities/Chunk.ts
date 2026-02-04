export interface Chunk {
  id: string;
  datasourceId: string;
  content: string;
  embedding: number[];
  metadata: any | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateChunkInput {
  datasourceId: string;
  content: string;
  embedding: number[];
  metadata?: any | null;
}

export interface UpdateChunkInput {
  content?: string;
  embedding?: number[];
  metadata?: any | null;
}
