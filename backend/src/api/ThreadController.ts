// backend/src/api/ThreadController.ts

import { Request, Response } from "express";
import { ThreadService } from "../services/ThreadService";

export class ThreadController {
  private service: ThreadService;

  constructor() {
    this.service = new ThreadService();
  }

  list = async (req: Request, res: Response) => {
    const { workspaceId } = req.params;
    const threads = await this.service.list(workspaceId);
    res.json(threads);
  };

  get = async (req: Request, res: Response) => {
    const { id, workspaceId } = req.params;
    const thread = await this.service.get(id, workspaceId);

    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }

    res.json(thread);
  };

  create = async (req: Request, res: Response) => {
    const { workspaceId } = req.params;
    const { title } = req.body;

    const thread = await this.service.create(workspaceId, title);
    res.status(201).json(thread);
  };

  update = async (req: Request, res: Response) => {
    const { id, workspaceId } = req.params;
    const { title } = req.body;

    const thread = await this.service.update(id, workspaceId, title);
    res.json(thread);
  };

  delete = async (req: Request, res: Response) => {
    const { id, workspaceId } = req.params;

    await this.service.delete(id, workspaceId);
    res.status(204).send();
  };
}
