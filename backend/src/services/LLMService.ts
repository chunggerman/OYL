// backend/src/services/LLMService.ts

export class LLMService {
  constructor() {
    // Add model clients or API clients here later
  }

  async generate(workspaceId: string, prompt: string, model: string) {
    // TODO: replace with real LLM call
    return {
      workspaceId,
      prompt,
      model,
      output: "placeholder response"
    };
  }
}
