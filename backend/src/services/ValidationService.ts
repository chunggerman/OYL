import { LLMService } from "./LLMService";

export class ValidationService {
  private llm: LLMService;

  constructor() {
    this.llm = new LLMService();
  }

  async validateAnswer(
    query: string,
    answer: string,
    contextChunks: {
      id: string;
      content: string;
      score: number;
      source: string[];
    }[]
  ) {
    const context = contextChunks
      .map((c) => `Chunk ${c.id}:\n${c.content}`)
      .join("\n\n");

    const prompt = `
You are a validation model. Your task is to check whether the answer is grounded in the provided context.

User Query:
${query}

Answer:
${answer}

Context:
${context}

Evaluate the answer with the following criteria:
1. Is the answer factually supported by the context?
2. Does the answer hallucinate information not present in the context?
3. Provide a confidence score from 0 to 1.
4. Provide a short explanation.

Respond in JSON with:
{
  "isValid": boolean,
  "confidence": number,
  "explanation": string
}
`;

    const result = await this.llm.generate(prompt);

    try {
      return JSON.parse(result);
    } catch {
      return {
        isValid: false,
        confidence: 0,
        explanation: "Validation model returned invalid JSON.",
      };
    }
  }
}
