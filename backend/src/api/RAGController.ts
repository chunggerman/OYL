import { Request, Response } from "express";
import { RAGService } from "../services/RAGService";

export class RAGController {
  private service: RAGService;

  constructor() {
    this.service = new RAGService();
  }

  query = async (req: Request, res: Response) => {
    const { workspaceId } = req.params;
    const { question, topK } = req.body;

    const result = await this.service.query(workspaceId, question, topK);
    res.json(result);
  };
}
