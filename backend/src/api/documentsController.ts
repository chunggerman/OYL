import { Request, Response } from "express";
import { DocumentService } from "../services/DocumentService";
import { DocumentIngestionService } from "../services/DocumentIngestionService";
import { VectorStoreClient } from "../services/EmbeddingService";

export class DocumentsController {
  private documentService: DocumentService;
  private ingestionService: DocumentIngestionService;

  constructor(vectorStoreClient: VectorStoreClient) {
    this.documentService = new DocumentService();
    this.ingestionService = new DocumentIngestionService(vectorStoreClient);
  }

  async listDocuments(req: Request, res: Response): Promise<void> {
    const { workspaceId } = req.query;
    if (!workspaceId || typeof workspaceId !== "string") {
      res.status(400).json({ error: "workspaceId is required" });
      return;
    }

    const documents = await this.documentService.listDocumentsByWorkspace(workspaceId);
    res.json(documents);
  }

  async getDocument(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const document = await this.documentService.getDocumentById(id);
    if (!document) {
      res.status(404).json({ error: "Document not found" });
      return;
    }
    res.json(document);
  }

  async createDocument(req: Request, res: Response): Promise<void> {
    const { workspaceId, referenceId, title, content, ingest } = req.body;
    if (!workspaceId || !title) {
      res.status(400).json({ error: "workspaceId and title are required" });
      return;
    }

    if (ingest && content) {
      const result = await this.ingestionService.ingestDocument({
        workspaceId,
        referenceId: referenceId ?? null,
        title,
        content,
      });
      res.status(201).json({ documentId: result.documentId });
      return;
    }

    const document = await this.documentService.createDocument({
      workspaceId,
      referenceId: referenceId ?? null,
      title,
      content: content ?? null,
    });
    res.status(201).json(document);
  }

  async deleteDocument(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await this.documentService.deleteDocument(id);
    res.status(204).send();
  }
}
