import { LlmClient } from "./LlmClient";
import { TagService } from "./TagService";

export class AiTagGenerator {
  private llm: LlmClient;
  private tags: TagService;

  constructor(llm: LlmClient) {
    this.llm = llm;
    this.tags = new TagService();
  }

  async generateTagsForChunk(params: {
    workspaceId: string;
    chunkId: string;
    text: string;
  }) {
    const prompt = `
Extract 1–5 short, meaningful tags from the following text.
Return ONLY a JSON array of strings.

Text:
${params.text}
`;

    const completion = await this.llm.complete({
      model: "gpt-4.1-mini",
      prompt,
      temperature: 0.1,
      maxTokens: 128,
    });

    let tags: string[] = [];
    try {
      tags = JSON.parse(completion.completion);
    } catch {
      tags = [];
    }

    for (const tag of tags) {
      await this.tags.assignTagToChunk({
        workspaceId: params.workspaceId,
        chunkId: params.chunkId,
        tagName: tag,
      });
    }

    return tags;
  }
}
