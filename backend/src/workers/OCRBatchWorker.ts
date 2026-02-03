import { PostgresChunkRepository } from "../domain/repositories/PostgresChunkRepository";
import { OCRService } from "../services/OCRService";

export class OCRBatchWorker {
  private chunkRepo = new PostgresChunkRepository();
  private ocr = new OCRService();

  async run() {
    const tasks = await this.chunkRepo.listPendingOCR();

    for (const task of tasks) {
      const text = await this.ocr.extractText(task.filePath);
      await this.chunkRepo.updateContent(task.id, text);
      await this.chunkRepo.markOCRComplete(task.id);
    }
  }
}
