import {
  RAG,
  CreateRAGInput,
  UpdateRAGInput,
} from "../entities/RAG";

export interface RAGRepository {
  listByChat(chatId: string): Promise<RAG[]>;
  listByMessage(messageId: string): Promise<RAG[]>;
  create(input: CreateRAGInput): Promise<RAG>;
  getById(id: string): Promise<RAG | null>;
  update(id: string, input: UpdateRAGInput): Promise<RAG | null>;
  delete(id: string): Promise<void>;
}
