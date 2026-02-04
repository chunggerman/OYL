// backend/src/api/RAGController.ts

import { Request, Response } from "express";
import { RAGService } from "../services/RAGService";

export class RAGController {
  private service: RAGService;

  constructor() {
    this.service = new RAGService();
  }

  generate = async (req: Request, res: Response) => {
    const { workspaceId } = req.params;
    const { query } = req.body;

    const result = await this.service.generate(workspaceId, query);
    res.json(result);
  };
}
