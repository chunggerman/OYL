import { Request, Response } from "express";
import { ApiKeyService } from "../services/ApiKeyService";

export class ApiKeyController {
  private service: ApiKeyService;

  constructor() {
    this.service = new ApiKeyService();
  }

  list = async (req: Request, res: Response) => {
    const { workspaceId } = req.params;
    const keys = await this.service.list(workspaceId);
    res.json(keys);
  };

  get = async (req: Request, res: Response) => {
    const { id, workspaceId } = req.params;
    const key = await this.service.get(id, workspaceId);

    if (!key) {
      return res.status(404).json({ error: "API key not found" });
    }

    res.json(key);
  };

  create = async (req: Request, res: Response) => {
    const { workspaceId } = req.params;
    const { name, key } = req.body;

    const apiKey = await this.service.create(workspaceId, name, key);
    res.status(201).json(apiKey);
  };

  delete = async (req: Request, res: Response) => {
    const { id, workspaceId } = req.params;

    await this.service.delete(id, workspaceId);
    res.status(204).send();
  };
}
