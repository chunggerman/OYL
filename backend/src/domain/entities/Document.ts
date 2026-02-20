//backend/src/domain/entities/Document.ts

export interface Document {
  id: string;
  workspaceId: string;
  documentSourceId: string;
  status: "pending" | "processing" | "completed" | "failed";
  metadata: Record<string, any> | null;
  createdAt: Date;
}
