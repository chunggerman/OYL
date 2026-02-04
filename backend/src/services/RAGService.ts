import {
  RAG,
  CreateRAGInput,
  UpdateRAGInput,
} from "../domain/entities/RAG";
import { RAGRepository } from "../domain/repositories/RAGRepository";

export class RAGService {
  constructor(private readonly repo: RAGRepository) {}

  listByChat(chatId: string): Promise<RAG[]> {
    return this.repo.listByChat(chatId);
  }

  listByMessage(messageId: string): Promise<RAG[]> {
    return this.repo.listByMessage(messageId);
  }

  create(input: CreateRAGInput): Promise<RAG> {
    return this.repo.create(input);
  }

  get(id: string): Promise<RAG | null> {
    return this.repo.getById(id);
  }

  update(id: string, input: UpdateRAGInput): Promise<RAG | null> {
    return this.repo.update(id, input);
  }

  delete(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}
