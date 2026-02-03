import { FileConversationMemory } from "../providers/memory/FileConversationMemory";
import { AskForDataOrchestrator } from "./AskForDataOrchestrator";
import { RagCompletionService } from "./RagCompletionService";
import { VectorStoreClient } from "./EmbeddingService";
import { LlmClient } from "./LlmClient";

export class ChatService {
  private memory: FileConversationMemory;
  private askForData: AskForDataOrchestrator;
  private rag: RagCompletionService;

  constructor(
    vectorStoreClient: VectorStoreClient,
    llmClient: LlmClient,
    memory?: FileConversationMemory
  ) {
    this.memory = memory ?? new FileConversationMemory();
    this.askForData = new AskForDataOrchestrator(vectorStoreClient, llmClient);
    this.rag = new RagCompletionService(vectorStoreClient, llmClient);
  }

  getOrCreateConversation(params: {
    conversationId: string;
    workspaceId: string;
    assistantId: string;
  }) {
    let convo = this.memory.getConversation(params.conversationId);
    if (!convo) {
      convo = this.memory.createConversation({
        id: params.conversationId,
        workspaceId: params.workspaceId,
        assistantId: params.assistantId,
      });
    }
    return convo;
  }

  async handleMessage(params: {
    conversationId: string;
    workspaceId: string;
    assistantId: string;
    userMessage: string;
    knownFields?: Record<string, any>;
    model?: string;
  }) {
    const convo = this.getOrCreateConversation({
      conversationId: params.conversationId,
      workspaceId: params.workspaceId,
      assistantId: params.assistantId,
    });

    this.memory.appendMessage(params.conversationId, {
      role: "user",
      content: params.userMessage,
      timestamp: Date.now(),
    });

    const askResult = await this.askForData.handle({
      workspaceId: params.workspaceId,
      assistantId: params.assistantId,
      userQuery: params.userMessage,
      knownFields: params.knownFields ?? {},
      model: params.model,
    });

    if (askResult.type === "ask_for_data") {
      const response = {
        type: "ask_for_data",
        missingFields: askResult.plan.missingFields,
        reasoning: askResult.plan.reasoning,
      };

      this.memory.appendMessage(params.conversationId, {
        role: "assistant",
        content: JSON.stringify(response),
        timestamp: Date.now(),
      });

      return response;
    }

    const response = {
      type: "answer",
      answer: askResult.answer,
      context: askResult.context,
    };

    this.memory.appendMessage(params.conversationId, {
      role: "assistant",
      content: askResult.answer,
      timestamp: Date.now(),
    });

    return response;
  }
}
