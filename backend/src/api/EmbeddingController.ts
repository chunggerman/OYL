// backend/src/api/EmbeddingController.ts

import { Request, Response } from "express";
import { EmbeddingService } from "../services/EmbeddingService";

export class EmbeddingController {
  private service: EmbeddingService;

  constructor() {
    this.service = new EmbeddingService();
  }

  listByChunk = async (req: Request, res: Response) => {
    const { chunkId, workspaceId } = req.params;
    const embeddings = await this.service.listByChunk(chunkId, workspaceId);
    res.json(embeddings);
  };

  get = async (req: Request, res: Response) => {
    const { id, workspaceId } = req.params;
    const embedding = await this.service.get(id, workspaceId);

    if (!embedding) {
      return res.status(404).json({ error: "Embedding not found" });
    }

    res.json(embedding);
  };

  create = async (req: Request, res: Response) => {
    const { chunkId, workspaceId } = req.params;
    const { vector } = req.body;

    const embedding = await this.service.create(
      workspaceId,
      chunkId,
      vector
    );

    res.status(201).json(embedding);
  };

  delete = async (req: Request, res: Response) => {
    const { id, workspaceId } = req.params;

    await this.service.delete(id, workspaceId);
    res.status(204).send();
  };
}
