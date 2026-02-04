// backend/src/api/MessageController.ts

import { Request, Response } from "express";
import { MessageService } from "../services/MessageService";

export class MessageController {
  private service: MessageService;

  constructor() {
    this.service = new MessageService();
  }

  list = async (req: Request, res: Response) => {
    const { threadId, workspaceId } = req.params;
    const messages = await this.service.list(threadId, workspaceId);
    res.json(messages);
  };

  get = async (req: Request, res: Response) => {
    const { id, workspaceId } = req.params;
    const message = await this.service.get(id, workspaceId);

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.json(message);
  };

  create = async (req: Request, res: Response) => {
    const { threadId, workspaceId } = req.params;
    const { content } = req.body;

    const message = await this.service.create(workspaceId, threadId, content);
    res.status(201).json(message);
  };

  delete = async (req: Request, res: Response) => {
    const { id, workspaceId } = req.params;

    await this.service.delete(id, workspaceId);
    res.status(204).send();
  };
}
