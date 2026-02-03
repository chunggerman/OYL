import { Request, Response } from "express";
import { RateLimitService } from "../services/RateLimitService";

export class RateLimitController {
  private service: RateLimitService;

  constructor() {
    this.service = new RateLimitService();
  }

  get = async (req: Request, res: Response) => {
    const { workspaceId } = req.params;
    const limits = await this.service.get(workspaceId);

    if (!limits) {
      return res.status(404).json({ error: "Rate limits not found" });
    }

    res.json(limits);
  };

  update = async (req: Request, res: Response) => {
    const { workspaceId } = req.params;
    const updates = req.body;

    const limits = await this.service.update(workspaceId, updates);

    if (!limits) {
      return res.status(404).json({ error: "Rate limits not found" });
    }

    res.json(limits);
  };
}
