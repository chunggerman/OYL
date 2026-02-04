export interface RAG {
  id: string;
  chatId: string | null;
  messageId: string | null;
  query: string;
  retrievedChunkIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateRAGInput {
  chatId?: string | null;
  messageId?: string | null;
  query: string;
  retrievedChunkIds: string[];
}

export interface UpdateRAGInput {
  query?: string;
  retrievedChunkIds?: string[];
}
