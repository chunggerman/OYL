import { Request, Response } from "express";

export class HealthController {
  ping = async (_req: Request, res: Response) => {
    res.json({ status: "ok" });
  };

  deep = async (_req: Request, res: Response) => {
    res.json({
      status: "ok",
      uptime: process.uptime(),
      timestamp: Date.now()
    });
  };
}
