//backend/src/domain/entities/Chunk.ts

export interface Chunk {
  id: string;
  documentId: string;
  position: number;
  text: string;
  length: number;
  overlap: number;
  hash: string | null;
  metadata: any;
  createdAt: Date;
  deletedAt: Date | null;
}

export interface CreateChunkInput {
  documentId: string;
  position: number;
  text: string;
  length: number;
  overlap: number;
  hash?: string | null;
  metadata?: any;
}

export interface UpdateChunkInput {
  text?: string;
  metadata?: any;
}
