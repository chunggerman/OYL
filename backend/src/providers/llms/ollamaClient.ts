import { LlmClient } from "../../services/LlmClient";

export class OllamaLlmClient implements LlmClient {
  private baseUrl: string;

  constructor(baseUrl = "http://localhost:11434") {
    this.baseUrl = baseUrl;
  }

  async complete(params: {
    model: string;
    prompt: string;
    temperature?: number;
    maxTokens?: number;
  }): Promise<{ completion: string }> {
    const response = await fetch(`${this.baseUrl}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: params.model,
        prompt: params.prompt,
        options: {
          temperature: params.temperature ?? 0.2,
          num_predict: params.maxTokens ?? 512,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama LLM error: ${response.statusText}`);
    }

    let fullText = "";
    for await (const chunk of response.body as any) {
      const text = new TextDecoder().decode(chunk);
      const lines = text.trim().split("\n");
      for (const line of lines) {
        try {
          const json = JSON.parse(line);
          if (json.response) fullText += json.response;
        } catch {
          continue;
        }
      }
    }

    return { completion: fullText.trim() };
  }
}
