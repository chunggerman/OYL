import {
  Chat,
  CreateChatInput,
  UpdateChatInput,
} from "../domain/entities/Chat";
import { ChatRepository } from "../domain/repositories/ChatRepository";

export class ChatService {
  constructor(private readonly repo: ChatRepository) {}

  listByUser(userId: string): Promise<Chat[]> {
    return this.repo.listByUser(userId);
  }

  create(input: CreateChatInput): Promise<Chat> {
    return this.repo.create(input);
  }

  get(id: string): Promise<Chat | null> {
    return this.repo.getById(id);
  }

  update(id: string, input: UpdateChatInput): Promise<Chat | null> {
    return this.repo.update(id, input);
  }

  delete(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}
