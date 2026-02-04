import { Request, Response } from "express";
import { DocumentService } from "../services/DocumentService";

export class DocumentController {
  private service: DocumentService;

  constructor() {
    this.service = new DocumentService();
  }

  async list(req: Request, res: Response) {
    const workspaceId = String(req.params.workspaceId);
    const documents = await this.service.list(workspaceId);
    res.json(documents);
  }

  async get(req: Request, res: Response) {
    const id = String(req.params.id);
    const workspaceId = String(req.params.workspaceId);
    const document = await this.service.get(id, workspaceId);
    res.json(document);
  }

  async create(req: Request, res: Response) {
    const workspaceId = String(req.params.workspaceId);
    const { title, source } = req.body;
    const document = await this.service.create(workspaceId, title, source);
    res.json(document);
  }

  async update(req: Request, res: Response) {
    const id = String(req.params.id);
    const workspaceId = String(req.params.workspaceId);
    const { title, source } = req.body;
    const document = await this.service.update(id, workspaceId, title, source);
    res.json(document);
  }

  async delete(req: Request, res: Response) {
    const id = String(req.params.id);
    const workspaceId = String(req.params.workspaceId);
    await this.service.delete(id, workspaceId);
    res.json({ deleted: true });
  }
}
