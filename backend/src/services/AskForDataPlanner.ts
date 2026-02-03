import { LlmClient } from "./LlmClient";

export interface AskForDataField {
  name: string;
  label: string;
  description?: string;
  required: boolean;
  type: "string" | "number" | "boolean";
}

export interface AskForDataPlan {
  missingFields: AskForDataField[];
  reasoning: string;
}

export class AskForDataPlanner {
  constructor(private llmClient: LlmClient) {}

  async plan(params: {
    model?: string;
    assistantInstruction?: string | null;
    userQuery: string;
    knownFields: Record<string, any>;
  }): Promise<AskForDataPlan> {
    const model = params.model ?? "gpt-4.1-mini";

    const prompt = `
You are a system that decides what additional structured information is needed from the user.

Assistant instructions:
${params.assistantInstruction ?? "(none)"}

User query:
${params.userQuery}

Known fields (JSON):
${JSON.stringify(params.knownFields, null, 2)}

You must respond with a strict JSON object with:
- "missingFields": array of objects { "name", "label", "description", "required", "type" }
- "reasoning": string

Only include fields that are truly needed to proceed. Use types: "string" | "number" | "boolean".
`;

    const completion = await this.llmClient.complete({
      model,
      prompt,
      temperature: 0.1,
      maxTokens: 512,
    });

    let parsed: any;
    try {
      parsed = JSON.parse(completion.completion);
    } catch {
      parsed = { missingFields: [], reasoning: "Failed to parse LLM output" };
    }

    const missingFields: AskForDataField[] = Array.isArray(parsed.missingFields)
      ? parsed.missingFields.map((f: any) => ({
          name: String(f.name),
          label: String(f.label ?? f.name),
          description: f.description ? String(f.description) : undefined,
          required: Boolean(f.required),
          type:
            f.type === "number" || f.type === "boolean"
              ? f.type
              : ("string" as const),
        }))
      : [];

    return {
      missingFields,
      reasoning: String(parsed.reasoning ?? ""),
    };
  }
}
