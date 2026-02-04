import {
  Message,
  CreateMessageInput,
  UpdateMessageInput,
} from "../entities/Message";

export interface MessageRepository {
  listByChat(chatId: string): Promise<Message[]>;
  create(input: CreateMessageInput): Promise<Message>;
  getById(id: string): Promise<Message | null>;
  update(id: string, input: UpdateMessageInput): Promise<Message | null>;
  delete(id: string): Promise<void>;
}
