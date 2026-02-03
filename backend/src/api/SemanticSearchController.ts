import { Request, Response } from "express";
import { SemanticSearchService } from "../services/SemanticSearchService";

export class SemanticSearchController {
  private service: SemanticSearchService;

  constructor() {
    this.service = new SemanticSearchService();
  }

  search = async (req: Request, res: Response) => {
    const { workspaceId } = req.params;
    const { query, topK } = req.body;

    const results = await this.service.search(workspaceId, query, topK);
    res.json(results);
  };
}
