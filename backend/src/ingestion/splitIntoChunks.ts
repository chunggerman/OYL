import crypto from "crypto";

export interface Chunk {
  content: string;
  position: number;
  length: number;
  overlap: number;
  hash: string;
  version: number;
  metadata: Record<string, any>;
}

interface SplitOptions {
  maxChunkSize: number;
  overlapSize: number;
  version?: number;
  baseMetadata?: Record<string, any>;
}

export function splitIntoChunks(
  text: string,
  options: SplitOptions = {
    maxChunkSize: 1000,
    overlapSize: 200,
  }
): Chunk[] {
  const maxChunkSize = options.maxChunkSize;
  const overlapSize = options.overlapSize;
  const version = options.version ?? 1;
  const baseMetadata = options.baseMetadata ?? {};

  const chunks: Chunk[] = [];
  const normalized = text.replace(/\r\n/g, "\n").trim();

  if (!normalized) {
    return [];
  }

  let position = 0;
  let index = 0;

  while (index < normalized.length) {
    const end = Math.min(index + maxChunkSize, normalized.length);
    const content = normalized.slice(index, end);
    const length = content.length;
    const overlap =
      index === 0 ? 0 : Math.min(overlapSize, length);

    const hash = crypto
      .createHash("sha256")
      .update(content)
      .digest("hex");

    const metadata = {
      ...baseMetadata,
      position,
      length,
      overlap,
    };

    chunks.push({
      content,
      position,
      length,
      overlap,
      hash,
      version,
      metadata,
    });

    position += 1;
    if (end === normalized.length) break;
    index = end - overlapSize;
  }

  return chunks;
}
