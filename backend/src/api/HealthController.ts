import { Request, Response } from "express";
import { HealthService } from "../services/HealthService";

const service = new HealthService();

export default class HealthController {
  check = async (_req: Request, res: Response) => {
    const result = await service.check();
    res.json({
      service: "backend",
      ...result,
      timestamp: new Date().toISOString(),
    });
  };
}
