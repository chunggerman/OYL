import { pool } from "../db";
import { VectorStoreClient } from "./EmbeddingService";
import { LlmClient } from "./LlmClient";
import { AssistantService } from "./AssistantService";

interface RagCompletionParams {
  workspaceId: string;
  assistantId: string;
  query: string;
  topK?: number;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export class RagCompletionService {
  private vectorStoreClient: VectorStoreClient;
  private llmClient: LlmClient;
  private assistantService: AssistantService;

  constructor(vectorStoreClient: VectorStoreClient, llmClient: LlmClient) {
    this.vectorStoreClient = vectorStoreClient;
    this.llmClient = llmClient;
    this.assistantService = new AssistantService();
  }

  async complete(params: RagCompletionParams): Promise<{
    answer: string;
    context: Array<{
      chunkId: string;
      text: string;
      documentId: string;
      documentTitle: string;
      score: number;
    }>;
  }> {
    const assistant = await this.assistantService.getAssistantById(
      params.assistantId
    );
    if (!assistant) {
      throw new Error("Assistant not found");
    }
    if (assistant.workspaceId !== params.workspaceId) {
      throw new Error("Assistant does not belong to workspace");
    }

    const topK = params.topK ?? 8;

    const vectorResults = await this.vectorStoreClient.query({
      workspaceId: params.workspaceId,
      query: params.query,
      topK,
    });

    const context: Array<{
      chunkId: string;
      text: string;
      documentId: string;
      documentTitle: string;
      score: number;
    }> = [];

    for (const r of vectorResults) {
      const chunkRow = await pool.query(
        `
        SELECT c.id, c.text, c.document_id, d.title
        FROM chunks c
        JOIN documents d ON d.id = c.document_id
        WHERE c.id = $1 AND c.deleted_at IS NULL AND d.deleted_at IS NULL
        `,
        [r.chunkId]
      );
      if (chunkRow.rowCount === 0) continue;
      const row = chunkRow.rows[0];
      context.push({
        chunkId: row.id,
        text: row.text,
        documentId: row.document_id,
        documentTitle: row.title,
        score: r.score,
      });
    }

    const systemInstructionParts: string[] = [];
    if (assistant.instruction) {
      systemInstructionParts.push(assistant.instruction);
    }
    if (assistant.aiInstruction) {
      systemInstructionParts.push(assistant.aiInstruction);
    }
    const systemInstruction = systemInstructionParts.join("\n\n");

    const contextText = context
      .map(
        (c, idx) =>
          `[#${idx + 1} | score=${c.score.toFixed(
            3
          )} | doc=${c.documentTitle}]\n${c.text}`
      )
      .join("\n\n");

    const prompt = [
      systemInstruction
        ? `You are an assistant with the following instructions:\n${systemInstruction}`
        : `You are a helpful assistant.`,
      `You are given the following context chunks from the knowledge base:`,
      contextText || "(no relevant context found)",
      `User question:\n${params.query}`,
      `Using only the information in the context when possible, answer the user's question clearly and concisely.`,
    ]
      .filter(Boolean)
      .join("\n\n");

    const model = params.model ?? "gpt-4.1-mini";
    const temperature = params.temperature ?? 0.2;
    const maxTokens = params.maxTokens ?? 512;

    const completion = await this.llmClient.complete({
      model,
      prompt,
      temperature,
      maxTokens,
    });

    return {
      answer: completion.completion,
      context,
    };
  }
}
