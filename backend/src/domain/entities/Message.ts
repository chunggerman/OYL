export interface Message {
  id: string;
  chatId: string;
  role: "user" | "assistant" | "system";
  content: string;
  metadata: any | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateMessageInput {
  chatId: string;
  role: "user" | "assistant" | "system";
  content: string;
  metadata?: any | null;
}

export interface UpdateMessageInput {
  content?: string;
  metadata?: any | null;
}
