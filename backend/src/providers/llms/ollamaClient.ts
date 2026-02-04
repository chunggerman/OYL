import { EmbeddingModelClient } from "../../services/EmbeddingService";

export class OllamaEmbeddingClient implements EmbeddingModelClient {
  private baseUrl: string;

  constructor(baseUrl = "http://localhost:11434") {
    this.baseUrl = baseUrl;
  }

  async embed(text: string): Promise<number[]> {
    const response = await fetch(`${this.baseUrl}/api/embeddings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "nomic-embed-text",
        prompt: text,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama embedding error: ${response.statusText}`);
    }

    const json = await response.json();
    return json.embedding;
  }
}
