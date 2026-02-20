//backend/src/services/ChunkService.ts

import { PostgresChunkRepository } from "../domain/repositories/PostgresChunkRepository";

export class ChunkService {
  private repo: PostgresChunkRepository;

  constructor(repo: PostgresChunkRepository) {
    this.repo = repo;
  }

  listByDocument(documentId: string) {
    return this.repo.listByDocument(documentId);
  }

  create(input: any) {
    return this.repo.create(input);
  }

  deleteByDocument(documentId: string) {
    return this.repo.deleteByDocument(documentId);
  }
}
