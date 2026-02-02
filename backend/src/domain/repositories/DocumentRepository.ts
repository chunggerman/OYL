import { Document } from "../entities/Document";

export interface DocumentRepository {
  findById(id: string): Promise<Document | null>;
  findByReference(referenceId: string): Promise<Document[]>;
  create(doc: Document): Promise<void>;
}
