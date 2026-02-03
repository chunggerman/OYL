import { PostgresEmbeddingRepository } from "../domain/repositories/PostgresEmbeddingRepository";

export class SemanticSearchService {
  private embeddingRepo: PostgresEmbeddingRepository;

  constructor() {
    this.embeddingRepo = new PostgresEmbeddingRepository();
  }

  async search(
    workspaceId: string,
    queryVector: number[],
    topK: number,
    model: string
  ) {
    return this.embeddingRepo.search(
      workspaceId,
      queryVector,
      topK,
      model
    );
  }
}
