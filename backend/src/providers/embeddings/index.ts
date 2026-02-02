import { embeddingProviders, EmbeddingProvider } from "../registry/embeddings";
import { generateOllamaEmbedding } from "./ollamaClient";
import path from "path";

export function getEmbeddingProviderById(id: string): EmbeddingProvider {
  const provider = embeddingProviders.find(p => p.id === id);
  if (!provider) {
    throw new Error("Unknown embedding provider: " + id);
  }
  return provider;
}

export async function generateEmbeddingById(
  providerId: string,
  input: string,
  options?: { isImage?: boolean }
): Promise<number[]> {
  const provider = getEmbeddingProviderById(providerId);

  // DeepSeek‑OCR requires special formatting
  if (provider.id === "deepseek-ocr") {
    if (!options?.isImage) {
      throw new Error(
        "DeepSeek‑OCR embedding requires image input. Provide { isImage: true }."
      );
    }

    const absolute = path.resolve(input);

    const formatted = `${absolute}\n<|grounding|>Extract semantic meaning of this page.`;

    return generateOllamaEmbedding(provider, formatted);
  }

  // Normal text embedding models
  return generateOllamaEmbedding(provider, input);
}
