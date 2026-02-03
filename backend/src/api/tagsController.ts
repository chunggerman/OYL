import { Request, Response } from "express";
import { TagService } from "../services/TagService";

export class TagController {
  private service: TagService;

  constructor() {
    this.service = new TagService();
  }

  listByChunk = async (req: Request, res: Response) => {
    const { chunkId, workspaceId } = req.params;
    const tags = await this.service.listByChunk(chunkId, workspaceId);
    res.json(tags);
  };

  get = async (req: Request, res: Response) => {
    const { id, workspaceId } = req.params;
    const tag = await this.service.get(id, workspaceId);

    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }

    res.json(tag);
  };

  create = async (req: Request, res: Response) => {
    const { chunkId, workspaceId } = req.params;
    const { name, confidence } = req.body;

    const tag = await this.service.create(
      workspaceId,
      chunkId,
      name,
      confidence
    );

    res.status(201).json(tag);
  };

  update = async (req: Request, res: Response) => {
    const { id, workspaceId } = req.params;
    const { name, confidence } = req.body;

    const tag = await this.service.update(
      id,
      workspaceId,
      name,
      confidence
    );

    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }

    res.json(tag);
  };

  delete = async (req: Request, res: Response) => {
    const { id, workspaceId } = req.params;

    await this.service.delete(id, workspaceId);
    res.status(204).send();
  };
}
