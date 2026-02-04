// backend/src/api/SemanticSearchController.ts

import { Request, Response } from "express";
import { SemanticSearchService } from "../services/SemanticSearchService";

export class SemanticSearchController {
  private service: SemanticSearchService;

  constructor() {
    this.service = new SemanticSearchService();
  }

  async search(req: Request, res: Response) {
    const workspaceId = String(req.params.workspaceId);
    const query = String(req.body.query ?? "");
    const topK = Number(req.body.topK ?? 10);

    // Explicit, deterministic model selection
    const model =
      (req.body.model as string | undefined) ||
      process.env.SEMANTIC_SEARCH_MODEL ||
      "default-model";

    const results = await this.service.search(
      workspaceId,
      query,
      topK,
      model
    );

    res.json(results);
  }
}
