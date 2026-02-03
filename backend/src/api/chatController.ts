import { Request, Response } from "express";
import { ChatService } from "../services/ChatService";
import { VectorStoreClient } from "../services/EmbeddingService";
import { LlmClient } from "../services/LlmClient";
import { FileConversationMemory } from "../providers/memory/FileConversationMemory";

export class ChatController {
  private chat: ChatService;

  constructor(vectorStoreClient: VectorStoreClient, llmClient: LlmClient) {
    this.chat = new ChatService(
      vectorStoreClient,
      llmClient,
      new FileConversationMemory()
    );
  }

  async handle(req: Request, res: Response): Promise<void> {
    const {
      conversationId,
      workspaceId,
      assistantId,
      userMessage,
      knownFields,
      model,
    } = req.body;

    if (!conversationId || !workspaceId || !assistantId || !userMessage) {
      res.status(400).json({
        error:
          "conversationId, workspaceId, assistantId, and userMessage are required",
      });
      return;
    }

    const result = await this.chat.handleMessage({
      conversationId,
      workspaceId,
      assistantId,
      userMessage,
      knownFields,
      model,
    });

    res.json(result);
  }
}
