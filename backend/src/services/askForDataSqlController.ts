import { Request, Response } from "express";
import { AskForDataSqlOrchestrator } from "../services/AskForDataSqlOrchestrator";
import { LlmClient } from "../services/LlmClient";

export class AskForDataSqlController {
  private orchestrator: AskForDataSqlOrchestrator;

  constructor(llmClient: LlmClient) {
    this.orchestrator = new AskForDataSqlOrchestrator(llmClient);
  }

  async handle(req: Request, res: Response): Promise<void> {
    const { workspaceId, question } = req.body;

    if (!workspaceId || !question) {
      res.status(400).json({
        error: "workspaceId and question are required",
      });
      return;
    }

    const result = await this.orchestrator.generateSqlFromQuestion({
      workspaceId,
      question,
    });

    res.json(result);
  }
}
