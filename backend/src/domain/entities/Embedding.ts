export interface Embedding {
  id: string;
  chunkId: string | null;
  messageId: string | null;
  vector: number[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEmbeddingInput {
  chunkId?: string | null;
  messageId?: string | null;
  vector: number[];
}

export interface UpdateEmbeddingInput {
  vector?: number[];
}
