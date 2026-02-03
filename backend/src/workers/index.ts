import { ReembeddingWorker } from "./ReembeddingWorker";
import { AutoTaggingWorker } from "./AutoTaggingWorker";
import { OCRBatchWorker } from "./OCRBatchWorker";
import { IngestionQueueWorker } from "./IngestionQueueWorker";
import { CleanupWorker } from "./CleanupWorker";
import { RetryWorker } from "./RetryWorker";

export const workers = [
  new ReembeddingWorker(),
  new AutoTaggingWorker(),
  new OCRBatchWorker(),
  new IngestionQueueWorker(),
  new CleanupWorker(),
  new RetryWorker(),
];
