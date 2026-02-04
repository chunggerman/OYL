import { Request, Response } from "express";
import { TagService } from "../services/TagService";
import { PostgresTagRepository } from "../domain/repositories/PostgresTagRepository";

const service = new TagService(new PostgresTagRepository());

export default class TagController {
  listByWorkspace = async (req: Request, res: Response) => {
    const items = await service.listByWorkspace(req.params.workspaceId);
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
