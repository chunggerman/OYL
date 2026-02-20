//backend/src/api/DocumentController.ts

import { Request, Response } from "express";
import { DocumentService } from "../services/DocumentService";

export class DocumentController {
  constructor(private service: DocumentService) {}

  upload = async (req: Request, res: Response) => {
    const workspaceId = req.headers["x-workspace-id"] as string;
    const debugFail = req.headers["x-debug-fail-ingestion"] === "true";

    if (!req.file) return res.status(400).json({ error: "Missing file" });
    if (!req.file.originalname || req.file.originalname.trim() === "")
      return res.status(400).json({ error: "Empty filename" });
    if (!req.file.mimetype)
      return res.status(400).json({ error: "Missing mimetype" });

    try {
      const result = await this.service.upload(workspaceId, req.file, debugFail);
      return res.status(201).json(result);
    } catch (err) {
      if (err instanceof Error && err.message === "INGESTION_FAIL") {
        return res.status(500).json({ error: "Ingestion failed" });
      }
      return res.status(500).json({ error: "Internal error" });
    }
  };

  getDocument = async (req: Request, res: Response) => {
    const workspaceId = req.headers["x-workspace-id"] as string;
    const result = await this.service.getDocument(req.params.documentId, workspaceId);

    if (result === "FORBIDDEN") return res.status(403).json({ error: "Forbidden" });
    if (!result) return res.status(404).json({ error: "Not found" });

    return res.json(result);
  };

  listDocuments = async (req: Request, res: Response) => {
    const workspaceId = req.headers["x-workspace-id"] as string;
    const docs = await this.service.listDocuments(workspaceId);
    return res.json(docs);
  };

  deleteDocument = async (req: Request, res: Response) => {
    const workspaceId = req.headers["x-workspace-id"] as string;
    const result = await this.service.deleteDocument(req.params.documentId, workspaceId);

    if (result === "FORBIDDEN") return res.status(403).json({ error: "Forbidden" });

    return res.json({ deleted: true });
  };
}
