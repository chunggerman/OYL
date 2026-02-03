import fs from "fs";
import path from "path";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  workspaceId: string;
  assistantId: string;
  messages: ChatMessage[];
}

export class FileConversationMemory {
  private storePath: string;

  constructor(storePath = path.join(process.cwd(), "conversation_store.json")) {
    this.storePath = storePath;

    if (!fs.existsSync(this.storePath)) {
      fs.writeFileSync(this.storePath, JSON.stringify([]));
    }
  }

  private load(): Conversation[] {
    return JSON.parse(fs.readFileSync(this.storePath, "utf8"));
  }

  private save(data: Conversation[]): void {
    fs.writeFileSync(this.storePath, JSON.stringify(data, null, 2));
  }

  getConversation(id: string): Conversation | null {
    const store = this.load();
    return store.find((c) => c.id === id) ?? null;
  }

  createConversation(params: {
    id: string;
    workspaceId: string;
    assistantId: string;
  }): Conversation {
    const store = this.load();

    const convo: Conversation = {
      id: params.id,
      workspaceId: params.workspaceId,
      assistantId: params.assistantId,
      messages: [],
    };

    store.push(convo);
    this.save(store);

    return convo;
  }

  appendMessage(conversationId: string, message: ChatMessage): void {
    const store = this.load();
    const convo = store.find((c) => c.id === conversationId);
    if (!convo) return;

    convo.messages.push(message);
    this.save(store);
  }
}
