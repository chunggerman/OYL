import { PostgresEmbeddingRepository } from "../domain/repositories/PostgresEmbeddingRepository";
import { TagSearchService } from "./TagSearchService";

export class RetrievalFusionService {
  private embeddingRepo: PostgresEmbeddingRepository;
  private tagSearch: TagSearchService;

  constructor() {
    this.embeddingRepo = new PostgresEmbeddingRepository();
    this.tagSearch = new TagSearchService();
  }

  async retrieve(
    workspaceId: string,
    queryVector: number[],
    queryTags: string[],
    topK: number,
    model: string
  ) {
    const semanticResults = await this.embeddingRepo.search(
      workspaceId,
      queryVector,
      topK,
      model
    );

    const tagResults = await this.tagSearch.search(
      workspaceId,
      queryTags,
      topK
    );

    const fused: Record<
      string,
      {
        chunkId: string;
        semanticScore: number;
        tagScore: number;
        totalScore: number;
        source: string[];
        chunk?: any;
      }
    > = {};

    for (const s of semanticResults) {
      fused[s.chunkId] = {
        chunkId: s.chunkId,
        semanticScore: s.score,
        tagScore: 0,
        totalScore: s.score,
        source: ["semantic"],
      };
    }

    for (const t of tagResults) {
      if (!fused[t.chunkId]) {
        fused[t.chunkId] = {
          chunkId: t.chunkId,
          semanticScore: 0,
          tagScore: t.score,
          totalScore: t.score,
          source: ["tag"],
          chunk: t.chunk,
        };
      } else {
        fused[t.chunkId].tagScore = t.score;
        fused[t.chunkId].totalScore =
          fused[t.chunkId].semanticScore + t.score;
        fused[t.chunkId].source.push("tag");
        fused[t.chunkId].chunk = t.chunk;
      }
    }

    const ranked = Object.values(fused)
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, topK);

    return ranked;
  }
}
