import { Request, Response } from "express";
import { ConfigService } from "../services/ConfigService";

export class ConfigController {
  private service: ConfigService;

  constructor() {
    this.service = new ConfigService();
  }

  get = async (req: Request, res: Response) => {
    const { workspaceId } = req.params;
    const config = await this.service.get(workspaceId);

    if (!config) {
      return res.status(404).json({ error: "Config not found" });
    }

    res.json(config);
  };

  update = async (req: Request, res: Response) => {
    const { workspaceId } = req.params;
    const updates = req.body;

    const config = await this.service.update(workspaceId, updates);

    if (!config) {
      return res.status(404).json({ error: "Config not found" });
    }

    res.json(config);
  };
}
