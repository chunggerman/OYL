import type { LlmProvider } from "../registry/llms";

export async function callOllamaLLM(
  provider: LlmProvider,
  messages: { role: string; content: string }[]
): Promise<string> {
  const res = await fetch(provider.endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: provider.model,
      messages
    })
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Ollama LLM error (${res.status}): ${body}`);
  }

  const json = await res.json();

  if (typeof json.message?.content === "string") {
    return json.message.content;
  }
  if (Array.isArray(json.choices) && json.choices[0]?.message?.content) {
    return json.choices[0].message.content;
  }

  throw new Error("Unexpected Ollama LLM response shape");
}
