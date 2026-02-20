// backend/src/domain/entities/ChunkSplitter.ts
export interface RawChunk {
  position: number;
  text: string;
  length: number;
  overlap: number;
  hash: string;
  metadata: any;
}

interface ChunkingConfig {
  maxChunkSize: number;
  overlap: number;
}

const DEFAULT_CONFIG: ChunkingConfig = {
  maxChunkSize: 1000,
  overlap: 200,
};

function hashText(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const chr = text.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return String(hash);
}

function splitIntoSentences(text: string): string[] {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned) return [];
  return cleaned.split(/(?<=[。！？!?\.])\s+/);
}

export function splitTextIntoChunks(
  fullText: string,
  config: Partial<ChunkingConfig> = {}
): RawChunk[] {
  const { maxChunkSize, overlap } = { ...DEFAULT_CONFIG, ...config };

  const sentences = splitIntoSentences(fullText);
  const chunks: RawChunk[] = [];

  let current = "";
  let position = 0;

  for (const sentence of sentences) {
    const candidate = current ? current + " " + sentence : sentence;

    if (candidate.length <= maxChunkSize) {
      current = candidate;
      continue;
    }

    if (current) {
      chunks.push({
        position,
        text: current,
        length: current.length,
        overlap,
        hash: hashText(current),
        metadata: {},
      });
      position++;
    }

    if (sentence.length > maxChunkSize) {
      let start = 0;
      while (start < sentence.length) {
        const end = Math.min(start + maxChunkSize, sentence.length);
        const piece = sentence.slice(start, end);

        chunks.push({
          position,
          text: piece,
          length: piece.length,
          overlap,
          hash: hashText(piece),
          metadata: {},
        });

        position++;
        start = end - overlap;
        if (start < 0) start = 0;
        if (start >= sentence.length) break;
      }
      current = "";
    } else {
      current = sentence;
    }
  }

  if (current) {
    chunks.push({
      position,
      text: current,
      length: current.length,
      overlap,
      hash: hashText(current),
      metadata: {},
    });
  }

  return chunks;
}
