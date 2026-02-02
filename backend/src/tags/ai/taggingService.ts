import { pool } from "../../db";
import { callLlmById } from "../../providers/llms";

export async function extractTagsFromText(
  workspaceId: string,
  chunkId: string,
  text: string
): Promise<string[]> {
  const providerId = "qwen2.5-14b";

  const messages = [
    {
      role: "system",
      content:
        "Extract short semantic tags from the text. Return ONLY a JSON array of strings. No explanations."
    },
    {
      role: "user",
      content: `Text:\n${text}\n\nReturn JSON array only.`
    }
  ];

  const raw = await callLlmById(providerId, messages);

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.map(t => String(t));
  } catch (err) {
    console.error("Failed to parse tags:", raw);
  }

  return [];
}

export async function saveChunkTags(
  chunkId: string,
  tags: string[]
): Promise<void> {
  if (!tags.length) return;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await client.query(
      `DELETE FROM chunk_tags WHERE chunk_id = $1`,
      [chunkId]
    );

    for (const tag of tags) {
      await client.query(
        `
        INSERT INTO chunk_tags (chunk_id, tag, confidence)
        VALUES ($1, $2, 1.0)
        `,
        [chunkId, tag]
      );
    }

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}
