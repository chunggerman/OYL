import { callLlmById } from "../../providers/llms";
import { llmProviders } from "../../providers/registry/llms";
import { pool } from "../../db";

async function getWorkspaceLlmProvider(workspaceId: string): Promise<string> {
  const res = await pool.query(
    `SELECT llm_provider
     FROM workspace_settings
     WHERE workspace_id = $1`,
    [workspaceId]
  );
  const row = res.rows[0];
  if (row?.llm_provider) return row.llm_provider;
  return llmProviders[0].id;
}

export async function generateAnswerFromContext(
  workspaceId: string,
  question: string,
  contextChunks: { text: string; tags?: string[] }[]
): Promise<string> {
  const providerId = await getWorkspaceLlmProvider(workspaceId);

  const contextText = contextChunks
    .map((c, i) => {
      const tags = c.tags && c.tags.length ? `\nTags: ${c.tags.join(", ")}` : "";
      return `Chunk ${i + 1}:\n${c.text}${tags}`;
    })
    .join("\n\n");

  const messages = [
    {
      role: "system",
      content:
        "You are an assistant that answers questions based only on the provided chunks and their tags."
    },
    {
      role: "user",
      content:
        `Question:\n${question}\n\n` +
        `Here are relevant chunks:\n\n${contextText}\n\n` +
        `Answer the question using only this information. If you are unsure, say you are unsure.`
    }
  ];

  return await callLlmById(providerId, messages);
}
