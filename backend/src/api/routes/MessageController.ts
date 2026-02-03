import { Request, Response } from "express";
import { MessageService } from "../services/MessageService";

export class MessageController {
  private service: MessageService;

  constructor() {
    this.service = new MessageService();
  }

  listByThread = async (req: Request, res: Response) => {
    const { threadId, workspaceId } = req.params;
    const messages = await this.service.listByThread(threadId, workspaceId);
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
    const { role, content } = req.body;

    const message = await this.service.create(
      workspaceId,
      threadId,
      role,
      content
    );

    res.status(201).json(message);
  };

  update = async (req: Request, res: Response) => {
    const { id, workspaceId } = req.params;
    const { role, content } = req.body;

    const message = await this.service.update(
      id,
      workspaceId,
      role,
      content
    );

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.json(message);
  };

  delete = async (req: Request, res: Response) => {
    const { id, workspaceId } = req.params;

    await this.service.delete(id, workspaceId);
    res.status(204).send();
  };
}
