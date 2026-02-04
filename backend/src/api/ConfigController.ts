// backend/src/api/ConfigController.ts

import { Request, Response } from "express";
import { ConfigService } from "../services/ConfigService";

export class ConfigController {
  private service: ConfigService;

  constructor() {
    this.service = new ConfigService();
  }

  list = async (req: Request, res: Response) => {
    const { workspaceId } = req.params;
    const configs = await this.service.list(workspaceId);
    res.json(configs);
  };

  get = async (req: Request, res: Response) => {
    const { workspaceId, key } = req.params;
    const config = await this.service.get(workspaceId, key);

    if (!config) {
      return res.status(404).json({ error: "Config not found" });
    }

    res.json(config);
  };

  set = async (req: Request, res: Response) => {
    const { workspaceId, key } = req.params;
    const { value } = req.body;

    const config = await this.service.set(workspaceId, key, value);
    res.status(201).json(config);
  };

  delete = async (req: Request, res: Response) => {
    const { workspaceId, key } = req.params;

    await this.service.delete(workspaceId, key);
    res.status(204).send();
  };
}
