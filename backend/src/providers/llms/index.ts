import { llmProviders, LlmProvider } from "../registry/llms";
import { callOllamaLLM } from "./ollamaClient";

export function getLlmProviderById(id: string): LlmProvider {
  const provider = llmProviders.find(p => p.id === id);
  if (!provider) {
    throw new Error("Unknown LLM provider: " + id);
  }
  return provider;
}

export async function callLlmById(
  providerId: string,
  messages: { role: string; content: string }[]
): Promise<string> {
  const provider = getLlmProviderById(providerId);

  switch (provider.type) {
    case "ollama":
      return callOllamaLLM(provider, messages);
    default:
      throw new Error("Unsupported LLM provider type: " + provider.type);
  }
}
