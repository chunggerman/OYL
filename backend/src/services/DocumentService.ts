//backend/src/services/DocumentService.ts

import { randomUUID } from "crypto";
import { DocumentRepository } from "../domain/repositories/DocumentRepository";
import { Document } from "../domain/entities/Document";
import { DocumentSource } from "../domain/entities/DocumentSource";
import { Ingestion } from "../domain/entities/IngestionJob";

export class DocumentService {
  constructor(private repo: DocumentRepository) {}

  async upload(workspaceId: string, file: Express.Multer.File, debugFailIngestion?: boolean) {
    const sourceId = randomUUID();
    const docId = randomUUID();
    const jobId = randomUUID();

    const source: DocumentSource = {
      id: sourceId,
      workspaceId,
      filename: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      storagePath: file.path,
      createdAt: new Date(),
    };

    const doc: Document = {
      id: docId,
      workspaceId,
      documentSourceId: sourceId,
      status: "pending",
      metadata: null,
      createdAt: new Date(),
    };

    if (debugFailIngestion) throw new Error("INGESTION_FAIL");

    const job: Ingestion = {
      id: jobId,
      datasourceId: docId,
      status: "queued",
      errorMessage: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.repo.createSource(source);
    await this.repo.createDocument(doc);
    await this.repo.createIngestionJob(job);

    return { documentSource: source, document: doc };
  }

  async getDocument(id: string, workspaceId: string) {
    const doc = await this.repo.getDocumentById(id);
    if (!doc) return null;
    if (doc.workspace_id !== workspaceId) return "FORBIDDEN";
    return doc;
  }

  async listDocuments(workspaceId: string) {
    return this.repo.listDocumentsByWorkspace(workspaceId);
  }

  async deleteDocument(id: string, workspaceId: string) {
    const doc = await this.repo.getDocumentById(id);
    if (!doc) return "FORBIDDEN";
    if (doc.workspace_id !== workspaceId) return "FORBIDDEN";
    await this.repo.deleteDocument(id);
    return true;
  }
}
