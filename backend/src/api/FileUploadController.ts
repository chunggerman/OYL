import { Request, Response } from "express";
import { FileUploadService } from "../services/FileUploadService";
import { PostgresFileUploadRepository } from "../domain/repositories/PostgresFileUploadRepository";

const service = new FileUploadService(new PostgresFileUploadRepository());

export default class FileUploadController {
  listByWorkspace = async (req: Request, res: Response) => {
    const items = await service.listByWorkspace(req.params.workspaceId);
    res.json({ items });
  };

  upload = async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const item = await service.create({
      workspaceId: req.body.workspaceId,
      filename: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      storagePath: req.file.path,
    });

    res.status(201).json(item);
  };

  get = async (req: Request, res: Response) => {
    const item = await service.get(req.params.id);
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  };

  delete = async (req: Request, res: Response) => {
    await service.delete(req.params.id);
    res.status(204).send();
  };
}
