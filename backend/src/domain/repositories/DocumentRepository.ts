//backend/src/domain/repositories/DocumentRepository.ts

import { Document } from "../entities/entity/document.entity";
import { DocumentSource } from "../entities/DocumentSource";
import { IngestionJob } from "../entities/entity/ingestionJob.entity";

export interface DocumentRepository {
  createSource(source: DocumentSource): Promise<void>;
  createDocument(doc: Document): Promise<void>;
  createIngestionJob(job: IngestionJob): Promise<void>;

  getDocumentById(id: string): Promise<Document | null>;
  listDocumentsByWorkspace(workspaceId: string): Promise<Document[]>;

  deleteDocument(id: string): Promise<void>;
}
