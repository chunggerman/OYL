import { Request, Response } from "express";
import { RagCompletionService } from "../services/RagCompletionService";
import { VectorStoreClient } from "../services/EmbeddingService";
import { LlmClient } from "../services/LlmClient";

export class RagController {
  private ragCompletionService: RagCompletionService;

  constructor(vectorStoreClient: VectorStoreClient, llmClient: LlmClient) {
    this.ragCompletionService = new RagCompletionService(
      vectorStoreClient,
      llmClient
    );
  }

  async complete(req: Request, res: Response): Promise<void> {
    const { workspaceId, assistantId, query, topK, model, temperature, maxTokens } =
      req.body;

    if (!workspaceId || !assistantId || !query) {
      res
        .status(400)
        .json({ error: "workspaceId, assistantId and query are required" });
      return;
    }

    try {
      const result = await this.ragCompletionService.complete({
        workspaceId,
        assistantId,
        query,
        topK,
        model,
        temperature,
        maxTokens,
      });

      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message ?? "RAG completion failed" });
    }
  }
}
