
export async function generateResponse(prompt: string, context: string[]) {
  // Placeholder LLM logic — deterministic for now
  const combined = context.join(" ").slice(0, 200);
  return `[DEMO RESPONSE] Prompt: "${prompt}" | Context: "${combined}"`;
}
