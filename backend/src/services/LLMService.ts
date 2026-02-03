export class LLMService {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.LLM_API_KEY || "";
  }

  async generate(prompt: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error("LLM API key not configured.");
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
      }),
    });

    if (!response.ok) {
      throw new Error(`LLM request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "";
  }
}
