import { IngestionQueue } from "../queues/IngestionQueue";
import { PostgresChunkRepository } from "../domain/repositories/PostgresChunkRepository";
import { ChunkingService } from "../services/ChunkingService";

export class IngestionQueueWorker {
  private queue = new IngestionQueue();
  private chunkRepo = new PostgresChunkRepository();
  private chunker = new ChunkingService();

  async run() {
    while (true) {
      const job = await this.queue.next();

      if (!job) {
        await new Promise((r) => setTimeout(r, 500));
        continue;
      }

      const chunks = this.chunker.chunk(job.content);

      for (const chunk of chunks) {
        await this.chunkRepo.create(job.workspaceId, chunk);
      }

      await this.queue.markComplete(job.id);
    }
  }
}
