import { Response } from "express";
import { RequestWithFile } from "../types/RequestWithFile";
import { FileUploadService } from "../services/FileUploadService";

export class FileUploadController {
  private service: FileUploadService;

  constructor() {
    this.service = new FileUploadService();
  }

  async upload(req: RequestWithFile, res: Response) {
    const workspaceId = String(req.params.workspaceId);

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const result = await this.service.upload(
      workspaceId,
      req.file.originalname,
      req.file.buffer
    );

    res.json(result);
  }
}
