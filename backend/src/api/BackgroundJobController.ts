import { Request, Response } from "express";
import { BackgroundJobService } from "../services/BackgroundJobService";

export class BackgroundJobController {
  private service: BackgroundJobService;

  constructor() {
    this.service = new BackgroundJobService();
  }

  list = async (_req: Request, res: Response) => {
    const jobs = await this.service.list();
    res.json(jobs);
  };

  get = async (req: Request, res: Response) => {
    const { id } = req.params;
    const job = await this.service.get(id);

    if (!job) {
      return res.status(404).json({ error: "Background job not found" });
    }

    res.json(job);
  };

  enqueue = async (req: Request, res: Response) => {
    const { type, payload } = req.body;

    const job = await this.service.enqueue(type, payload);
    res.status(201).json(job);
  };

  retry = async (req: Request, res: Response) => {
    const { id } = req.params;

    const job = await this.service.retry(id);

    if (!job) {
      return res.status(404).json({ error: "Background job not found" });
    }

    res.json(job);
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    await this.service.delete(id);
    res.status(204).send();
  };
}
