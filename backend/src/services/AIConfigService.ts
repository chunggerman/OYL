export interface AIConfig {
  model: string;
  embeddingModel: string;
  temperature: number;
  maxTokens: number;
}

export interface AIConfigSource {
  workspaceConfig?: Partial<AIConfig>;
  requestOverrides?: Partial<AIConfig>;
}

export class AIConfigService {
  private readonly defaultConfig: AIConfig = {
    model: "gpt-4",
    embeddingModel: "nomic-embed-text",
    temperature: 0.2,
    maxTokens: 2048,
  };

  resolveConfig(sources: AIConfigSource): AIConfig {
    return {
      model:
        sources.requestOverrides?.model ??
        sources.workspaceConfig?.model ??
        this.defaultConfig.model,

      embeddingModel:
        sources.requestOverrides?.embeddingModel ??
        sources.workspaceConfig?.embeddingModel ??
        this.defaultConfig.embeddingModel,

      temperature:
        sources.requestOverrides?.temperature ??
        sources.workspaceConfig?.temperature ??
        this.defaultConfig.temperature,

      maxTokens:
        sources.requestOverrides?.maxTokens ??
        sources.workspaceConfig?.maxTokens ??
        this.defaultConfig.maxTokens,
    };
  }
}
