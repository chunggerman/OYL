import { Request, Response } from "express";
import { AskForDataOrchestrator } from "../services/AskForDataOrchestrator";
import { VectorStoreClient } from "../services/EmbeddingService";
import { LlmClient } from "../services/LlmClient";

export class AskForDataController {
  private orchestrator: AskForDataOrchestrator;

  constructor(vectorStoreClient: VectorStoreClient, llmClient: LlmClient) {
    this.orchestrator = new AskForDataOrchestrator(
      vectorStoreClient,
      llmClient
    );
  }

  async handle(req: Request, res: Response): Promise<void> {
    const { workspaceId, assistantId, userQuery, knownFields, model } =
      req.body;

    if (!workspaceId || !assistantId || !userQuery) {
      res.status(400).json({
        error: "workspaceId, assistantId and userQuery are required",
      });
      return;
    }

    const result = await this.orchestrator.handle({
      workspaceId,
      assistantId,
      userQuery,
      knownFields: knownFields ?? {},
      model,
    });

    res.json(result);
  }
}
