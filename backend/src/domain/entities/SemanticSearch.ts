export interface SemanticSearch {
  id: string;
  query: string;
  embedding: number[];
  topK: number;
  retrievedChunkIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSemanticSearchInput {
  query: string;
  embedding: number[];
  topK: number;
  retrievedChunkIds: string[];
}

export interface UpdateSemanticSearchInput {
  topK?: number;
  retrievedChunkIds?: string[];
}
