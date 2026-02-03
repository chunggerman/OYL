import { PostgresChunkRepository } from "../domain/repositories/PostgresChunkRepository";
import { PostgresTagLinkRepository } from "../domain/repositories/PostgresTagLinkRepository";
import { LLMService } from "../services/LLMService";

export class AutoTaggingWorker {
  private chunkRepo = new PostgresChunkRepository();
  private tagLinkRepo = new PostgresTagLinkRepository();
  private llm = new LLMService();

  async run() {
    const chunks = await this.chunkRepo.listUntagged();

    for (const chunk of chunks) {
      const tags = await this.llm.generateTags(chunk.content);

      for (const tag of tags) {
        await this.tagLinkRepo.addTag(chunk.id, tag, 1.0);
      }

      await this.chunkRepo.markTagged(chunk.id);
    }
  }
}
