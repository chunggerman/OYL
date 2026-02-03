export interface LlmClient {
  complete(params: {
    model: string;
    prompt: string;
    temperature?: number;
    maxTokens?: number;
  }): Promise<{
    completion: string;
  }>;
}
