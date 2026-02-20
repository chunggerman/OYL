// backend/src/api/DocumentChunkController.ts

import { Request, Response } from "express";
import { ChunkService } from "../services/ChunkService";
import { ChunkingService } from "../services/ChunkingService";
import { PostgresChunkRepository } from "../domain/repositories/PostgresChunkRepository";

const repo = new PostgresChunkRepository();
const chunkService = new ChunkService(repo);
const chunkingService = new ChunkingService(repo);

// Simple UUID validator
function isUUID(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value
  );
}

export default class DocumentChunkController {
  listChunks = async (req: Request, res: Response) => {
    const { workspaceId, documentId } = req.params;

    if (req.header("X-Workspace-ID") !== workspaceId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    if (!isUUID(documentId)) {
      return res.status(400).json({ error: "Invalid documentId (must be UUID)" });
    }

    const items = await chunkService.listByDocument(documentId);
    if (!items || items.length === 0) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json(items);
  };

  chunkDocument = async (req: Request, res: Response) => {
    const { workspaceId, documentId } = req.params;

    if (req.header("X-Workspace-ID") !== workspaceId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    if (!isUUID(documentId)) {
      return res.status(400).json({ error: "Invalid documentId (must be UUID)" });
    }

    if (req.header("X-Debug-Fail-Chunking")) {
      return res.status(500).json({ error: "Chunking failed" });
    }

    try {
      const count = await chunkingService.chunkDocument(documentId);
      return res.status(201).json({ status: "chunked", chunks: count });
    } catch (err: any) {
      console.error("CHUNKING ERROR:", err);

      if (err.message === "DOCUMENT_NOT_FOUND") {
        return res.status(404).json({ error: "Document not found" });
      }
      if (err.message === "DOCUMENT_EMPTY") {
        return res.status(400).json({ error: "Document empty" });
      }
      if (err.message === "ALREADY_CHUNKED") {
        return res.status(409).json({ error: "Chunking already completed" });
      }

      return res.status(500).json({ error: "Chunking failed" });
    }
  };
}
