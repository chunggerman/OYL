import {
  Chat,
  CreateChatInput,
  UpdateChatInput,
} from "../entities/Chat";

export interface ChatRepository {
  listByUser(userId: string): Promise<Chat[]>;
  create(input: CreateChatInput): Promise<Chat>;
  getById(id: string): Promise<Chat | null>;
  update(id: string, input: UpdateChatInput): Promise<Chat | null>;
  delete(id: string): Promise<void>;
}
