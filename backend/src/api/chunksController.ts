import { Request, Response } from "express";
import { ChunkService } from "../services/ChunkService";

export class ChunkController {
  private service: ChunkService;

  constructor() {
    this.service = new ChunkService();
  }

  listByDocument = async (req: Request, res: Response) => {
    const { documentId, workspaceId } = req.params;
    const chunks = await this.service.listByDocument(documentId, workspaceId);
    res.json(chunks);
  };

  get = async (req: Request, res: Response) => {
    const { id, workspaceId } = req.params;
    const chunk = await this.service.get(id, workspaceId);

    if (!chunk) {
      return res.status(404).json({ error: "Chunk not found" });
    }

    res.json(chunk);
  };

  create = async (req: Request, res: Response) => {
    const { documentId, workspaceId } = req.params;
    const { content, index } = req.body;

    const chunk = await this.service.create(
      workspaceId,
      documentId,
      content,
      index
    );

    res.status(201).json(chunk);
  };

  update = async (req: Request, res: Response) => {
    const { id, workspaceId } = req.params;
    const { content, index } = req.body;

    const chunk = await this.service.update(
      id,
      workspaceId,
      content,
      index
    );

    if (!chunk) {
      return res.status(404).json({ error: "Chunk not found" });
    }

    res.json(chunk);
  };

  delete = async (req: Request, res: Response) => {
    const { id, workspaceId } = req.params;

    await this.service.delete(id, workspaceId);
    res.status(204).send();
  };
}
