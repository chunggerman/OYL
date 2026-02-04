// backend/src/api/LLMController.ts

import { Request, Response } from "express";
import { LLMService } from "../services/LLMService";

export class LLMController {
  private service: LLMService;

  constructor() {
    this.service = new LLMService();
  }

  generate = async (req: Request, res: Response) => {
    const { workspaceId } = req.params;
    const { prompt, model } = req.body;

    const result = await this.service.generate(
      workspaceId,
      prompt,
      model || "default-model"
    );

    res.json(result);
  };
}
