//backend/src/domain/entities/Documentsource.ts

export interface DocumentSource {
  id: string;
  workspaceId: string;
  filename: string;
  mimetype: string;
  size: number;
  storagePath: string;
  createdAt: Date;
}
