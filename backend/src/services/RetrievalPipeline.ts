import { AIConfigService, AIConfigSource } from "./AIConfigService";
import { SemanticSearchService } from "./SemanticSearchService";
import { TagSearchService } from "./TagSearchService";
import { RetrievalFusionService } from "./RetrievalFusionService";
import { SummarizationService } from "./SummarizationService";
import { ValidationService } from "./ValidationService";

export class RetrievalPipeline {
  private aiConfig: AIConfigService;
  private semanticSearch: SemanticSearchService;
  private tagSearch: TagSearchService;
  private fusion: RetrievalFusionService;
  private summarizer: SummarizationService;
  private validator: ValidationService;

  constructor() {
    this.aiConfig = new AIConfigService();
    this.semanticSearch = new SemanticSearchService();
    this.tagSearch = new TagSearchService();
    this.fusion = new RetrievalFusionService();
    this.summarizer = new SummarizationService();
    this.validator = new ValidationService();
  }

  async run(options: {
    workspaceId: string;
    query: string;
    queryVector: number[];
    queryTags: string[];
    topK: number;
    configSources: AIConfigSource;
  }) {
    const {
      workspaceId,
      query,
      queryVector,
      queryTags,
      topK,
      configSources,
    } = options;

    const config = this.aiConfig.resolveConfig(configSources);

    const semanticResults = await this.semanticSearch.search(
      workspaceId,
      queryVector,
      topK,
      config.embeddingModel
    );

    const tagResults = await this.tagSearch.search(
      workspaceId,
      queryTags,
      topK
    );

    const fused = await this.fusion.retrieve(
      workspaceId,
      queryVector,
      queryTags,
      topK,
      config.embeddingModel
    );

    const summary = await this.summarizer.summarize(
      workspaceId,
      fused,
      query
    );

    const validation = await this.validator.validateAnswer(
      query,
      summary.answer,
      summary.usedChunks
    );

    return {
      config,
      semanticResults,
      tagResults,
      fusedResults: fused,
      answer: summary.answer,
      usedChunks: summary.usedChunks,
      validation,
    };
  }
}
