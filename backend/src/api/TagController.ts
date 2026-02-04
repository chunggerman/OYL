// backend/src/api/TagController.ts

import { Request, Response } from "express";
import { TagService } from "../services/TagService";

export class TagController {
  private service: TagService;

  constructor() {
    this.service = new TagService();
  }

  list = async (req: Request, res: Response) => {
    const { workspaceId } = req.params;
    const tags = await this.service.list(workspaceId);
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
    const { workspaceId } = req.params;
    const { name } = req.body;

    const tag = await this.service.create(workspaceId, name);
    res.status(201).json(tag);
  };

  update = async (req: Request, res: Response) => {
    const { id, workspaceId } = req.params;
    const { name } = req.body;

    const tag = await this.service.update(id, workspaceId, name);
    res.json(tag);
  };

  delete = async (req: Request, res: Response) => {
    const { id, workspaceId } = req.params;

    await this.service.delete(id, workspaceId);
    res.status(204).send();
  };
}
