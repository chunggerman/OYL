
import { Pool } from "pg";
import { loadAssistant } from "./loadAssistant";
import { generateResponse } from "./generateResponse";
import { logInteraction } from "./logInteraction";
import { search } from "../search/search";

export async function runAssistant(
  db: Pool,
  assistantId: string,
  userMessage: string
) {
  const assistant = await loadAssistant(db, assistantId);

  const fakeEmbedding = new Array(128).fill(0.1);

  const searchResults = await search(
    db,
    assistant.workspace_id,
    fakeEmbedding,
    {}
  );

  const context = searchResults.vector.map((c) => c.content);

  const response = await generateResponse(userMessage, context);

  await logInteraction(db, assistantId, userMessage, response);

  return {
    assistant: assistant.name,
    response,
    contextUsed: context
  };
}
