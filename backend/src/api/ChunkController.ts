import { Request, Response } from "express";
import { ChunkService } from "../services/ChunkService";
import { PostgresChunkRepository } from "../domain/repositories/PostgresChunkRepository";

const service = new ChunkService(new PostgresChunkRepository());

export default class ChunkController {
  list = async (req: Request, res: Response) => {
    const items = await service.list();
    res.json({ items });
  };

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

  update = async (req: Request, res: Response) => {
    const item = await service.update(req.params.id, req.body);
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  };

  delete = async (req: Request, res: Response) => {
    await service.delete(req.params.id);
    res.status(204).send();
  };
}
