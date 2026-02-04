import {
  Message,
  CreateMessageInput,
  UpdateMessageInput,
} from "../domain/entities/Message";
import { MessageRepository } from "../domain/repositories/MessageRepository";

export class MessageService {
  constructor(private readonly repo: MessageRepository) {}

  listByChat(chatId: string): Promise<Message[]> {
    return this.repo.listByChat(chatId);
  }

  create(input: CreateMessageInput): Promise<Message> {
    return this.repo.create(input);
  }

  get(id: string): Promise<Message | null> {
    return this.repo.getById(id);
  }

  update(id: string, input: UpdateMessageInput): Promise<Message | null> {
    return this.repo.update(id, input);
  }

  delete(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}
