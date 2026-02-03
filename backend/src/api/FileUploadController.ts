import { Request, Response } from "express";
import { FileUploadService } from "../services/FileUploadService";

export class FileUploadController {
  private service: FileUploadService;

  constructor() {
    this.service = new FileUploadService();
  }

  upload = async (req: Request, res: Response) => {
    const { workspaceId } = req.params;
    const { title, source, chunks } = req.body;

    if (!Array.isArray(chunks)) {
      return res.status(400).json({ error: "Chunks must be an array" });
    }

    const document = await this.service.createDocumentWithChunks(
      workspaceId,
      title,
      source,
      chunks
    );

    res.status(201).json(document);
  };
}
