import { PostgresTagRepository } from "../domain/repositories/PostgresTagRepository";
import { PostgresTagLinkRepository } from "../domain/repositories/PostgresTagLinkRepository";
import { PostgresChunkRepository } from "../domain/repositories/PostgresChunkRepository";

export class TagSearchService {
  private tagRepo: PostgresTagRepository;
  private tagLinkRepo: PostgresTagLinkRepository;
  private chunkRepo: PostgresChunkRepository;

  constructor() {
    this.tagRepo = new PostgresTagRepository();
    this.tagLinkRepo = new PostgresTagLinkRepository();
    this.chunkRepo = new PostgresChunkRepository();
  }

  async search(workspaceId: string, queryTags: string[], topK: number) {
    if (!queryTags || queryTags.length === 0) return [];

    const tagMatches: {
      chunkId: string;
      tag: string;
      confidence: number;
    }[] = [];

    for (const tag of queryTags) {
      const links = await this.tagLinkRepo.listByTag(tag, workspaceId);
      for (const link of links) {
        tagMatches.push({
          chunkId: link.chunk_id,
          tag: link.tag,
          confidence: link.confidence,
        });
      }
    }

    const aggregated: Record<
      string,
      { chunkId: string; score: number; tags: string[] }
    > = {};

    for (const match of tagMatches) {
      if (!aggregated[match.chunkId]) {
        aggregated[match.chunkId] = {
          chunkId: match.chunkId,
          score: 0,
          tags: [],
        };
      }
      aggregated[match.chunkId].score += match.confidence;
      aggregated[match.chunkId].tags.push(match.tag);
    }

    const sorted = Object.values(aggregated)
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);

    const chunks = await Promise.all(
      sorted.map(async (item) => {
        const chunk = await this.chunkRepo.getById(item.chunkId, workspaceId);
        return {
          chunkId: item.chunkId,
          score: item.score,
          tags: item.tags,
          chunk,
        };
      })
    );

    return chunks;
  }
}
