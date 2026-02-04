import { Request, Response } from "express";
import { IngestionService } from "../services/IngestionService";
import { PostgresIngestionRepository } from "../domain/repositories/PostgresIngestionRepository";

const service = new IngestionService(new PostgresIngestionRepository());

export default class IngestionController {
  listByDatasource = async (req: Request, res: Response) => {
    const items = await service.listByDatasource(req.params.datasourceId);
    res.json({ items });
  };

  create = async (req: Request, res: Response) => {
    const item = await service.create(req.body);
    res.status(201).json(item);
  };

  get = async (req: Request, res: Response) => {
    const item = await service.get(req.params.id);
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  };

  updateStatus = async (req: Request, res: Response) => {
    const item = await service.updateStatus(req.params.id, req.body);
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  };

  delete = async (req: Request, res: Response) => {
    await service.delete(req.params.id);
    res.status(204).send();
  };
}
