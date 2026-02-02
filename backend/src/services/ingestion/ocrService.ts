import { generateEmbeddingById } from "../rag/embeddingService";
import { embeddingProviders } from "../../providers/registry/embeddings";
import { pool } from "../../db";

async function getWorkspaceEmbeddingProvider(workspaceId: string): Promise<string> {
  const res = await pool.query(
    `SELECT embedding_provider
     FROM workspace_settings
     WHERE workspace_id = $1`,
    [workspaceId]
  );
  const row = res.rows[0];
  if (row?.embedding_provider) return row.embedding_provider;
  return embeddingProviders[0].id;
}

export async function extractOcrText(
  workspaceId: string,
  imagePath: string
): Promise<string> {
  const providerId = await getWorkspaceEmbeddingProvider(workspaceId);

  if (providerId !== "deepseek-ocr") {
    throw new Error(
      "OCR extraction requires DeepSeek-OCR as the embedding provider."
    );
  }

  const input = `${imagePath}\n<|grounding|>Extract all readable text from this page. Return plain text only.`;

  const vector = await generateEmbeddingById(providerId, input, {
    isImage: true
  });

  return "[OCR text extraction placeholder: DeepSeek-OCR returns embeddings only. Use LLM call for text extraction.]";
}

import { callLlmById } from "../../providers/llms";

export async function extractOcrTextLLM(
  workspaceId: string,
  imagePath: string
): Promise<string> {
  const providerId = "deepseek-ocr-llm";

  const messages = [
    {
      role: "user",
      content:
        `${imagePath}\n<|grounding|>Extract all readable text from this page. Return plain text only.`
    }
  ];

  const text = await callLlmById(providerId, messages);
  return text.trim();
}
