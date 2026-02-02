import { DocumentRepository } from "../domain/repositories/DocumentRepository";
import { Document } from "../domain/entities/Document";

export class DocumentService {
  constructor(private readonly repo: DocumentRepository) {}

  async getDocument(id: string): Promise<Document | null> {
    return this.repo.findById(id);
  }

  async getByReference(referenceId: string): Promise<Document[]> {
    return this.repo.findByReference(referenceId);
  }

  async createDocument(doc: Document): Promise<void> {
    await this.repo.create(doc);
  }
}
