import { PostgresEmbeddingRepository } from "../domain/repositories/PostgresEmbeddingRepository";
import { PostgresChunkRepository } from "../domain/repositories/PostgresChunkRepository";
import { LLMService } from "../services/LLMService";

export class ReembeddingWorker {
  private chunkRepo = new PostgresChunkRepository();
  private embeddingRepo = new PostgresEmbeddingRepository();
  private llm = new LLMService();

  async run() {
    const pending = await this.chunkRepo.listNeedingReembedding();

    for (const chunk of pending) {
      const vector = await this.llm.generateEmbedding(chunk.content);
      await this.embeddingRepo.updateEmbedding(chunk.id, vector);
      await this.chunkRepo.markReembedded(chunk.id);
    }
  }
}
