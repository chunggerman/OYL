
import { Pool } from "pg";
import { search } from "../search/search";
import { runAssistant } from "../assistant/runAssistant";

export async function runStep(db: Pool, step: any, workspaceId: string) {
  const type = step.step_type;
  const config = step.config;

  if (type === "search") {
    const fakeEmbedding = new Array(128).fill(0.1);
    return await search(db, workspaceId, fakeEmbedding, config.filters || {});
  }

  if (type === "assistant") {
    return await runAssistant(db, config.assistantId, config.message);
  }

  if (type === "log") {
    console.log("Workflow log:", config.message);
    return { logged: true };
  }

  return { error: "Unknown step type" };
}
