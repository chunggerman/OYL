import { RagSearchService } from "./RagSearchService";
import { EmbeddingModelClient } from "./EmbeddingService";
import { LlmClient } from "./LlmClient";
import { AssistantService } from "./AssistantService";

export class RagCompletionService {
  private search: RagSearchService;
  private embedder: EmbeddingModelClient;
  private llm: LlmClient;
  private assistants: AssistantService;

  constructor(
    embedder: EmbeddingModelClient,
    llm: LlmClient
  ) {
    this.search = new RagSearchService();
    this.embedder = embedder;
    this.llm = llm;
    this.assistants = new AssistantService();
  }

  async complete(params: {
    workspaceId: string;
    assistantId: string;
    query: string;
    model?: string;
    temperature?: number;
    maxTokens?: number;
  }) {
    const assistant = await this.assistants.getAssistantById(params.assistantId);
    if (!assistant) throw new Error("Assistant not found");

    const queryEmbedding = await this.embedder.embed(params.query);

    const context = await this.search.search({
      workspaceId: params.workspaceId,
      queryEmbedding,
      topK: 8,
    });

    const contextText = context
      .map(
        (c, i) =>
          `[#${i + 1} | score=${c.score.toFixed(3)} | doc=${c.documentTitle}]\n${c.text}`
      )
      .join("\n\n");

    const prompt = `
${assistant.instruction ?? ""}
${assistant.aiInstruction ?? ""}

Context:
${contextText}

User:
${params.query}

Answer using only the context when possible.
`;

    const completion = await this.llm.complete({
      model: params.model ?? "gpt-4.1-mini",
      prompt,
      temperature: params.temperature ?? 0.2,
      maxTokens: params.maxTokens ?? 512,
    });

    return {
      answer: completion.completion,
      context,
    };
  }
}
