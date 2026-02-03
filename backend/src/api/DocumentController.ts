import { Request, Response } from "express";
import { DocumentService } from "../services/DocumentService";

export class DocumentController {
  private service: DocumentService;

  constructor() {
    this.service = new DocumentService();
  }

  list = async (req: Request, res: Response) => {
    const { workspaceId } = req.params;
    const documents = await this.service.list(workspaceId);
    res.json(documents);
  };

  get = async (req: Request, res: Response) => {
    const { id, workspaceId } = req.params;
    const document = await this.service.get(id, workspaceId);

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.json(document);
  };

  create = async (req: Request, res: Response) => {
    const { workspaceId } = req.params;
    const { title, source } = req.body;

    const document = await this.service.create(workspaceId, title, source);
    res.status(201).json(document);
  };

  update = async (req: Request, res: Response) => {
    const { id, workspaceId } = req.params;
    const { title, source } = req.body;

    const document = await this.service.update(id, workspaceId, title, source);

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.json(document);
  };

  delete = async (req: Request, res: Response) => {
    const { id, workspaceId } = req.params;

    await this.service.delete(id, workspaceId);
    res.status(204).send();
  };
}
