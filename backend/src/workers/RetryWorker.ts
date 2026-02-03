import { RetryQueue } from "../queues/RetryQueue";

export class RetryWorker {
  private queue = new RetryQueue();

  async run() {
    const jobs = await this.queue.listFailed();

    for (const job of jobs) {
      try {
        await this.queue.retry(job);
        await this.queue.markRetried(job.id);
      } catch {
        await this.queue.incrementAttempts(job.id);
      }
    }
  }
}
