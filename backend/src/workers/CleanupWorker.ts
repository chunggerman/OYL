import { PostgresChunkRepository } from "../domain/repositories/PostgresChunkRepository";

export class CleanupWorker {
  private chunkRepo = new PostgresChunkRepository();

  async run() {
    await this.chunkRepo.deleteExpired();
    await this.chunkRepo.deleteOrphaned();
  }
}
