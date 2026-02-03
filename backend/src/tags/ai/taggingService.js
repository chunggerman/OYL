"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTagsFromText = extractTagsFromText;
exports.saveChunkTags = saveChunkTags;
const db_1 = require("../../db");
const llms_1 = require("../../providers/llms");
async function extractTagsFromText(workspaceId, chunkId, text) {
    const providerId = "qwen2.5-14b";
    const messages = [
        {
            role: "system",
            content: "Extract short semantic tags from the text. Return ONLY a JSON array of strings."
        },
        {
            role: "user",
            content: `Text:\n${text}\n\nReturn JSON array only.`
        }
    ];
    const raw = await (0, llms_1.callLlmById)(providerId, messages);
    try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed))
            return parsed.map(t => String(t));
    }
    catch (err) {
        console.error("Failed to parse tags:", raw);
    }
    return [];
}
async function saveChunkTags(chunkId, tags) {
    if (!tags.length)
        return;
    const client = await db_1.pool.connect();
    try {
        await client.query("BEGIN");
        await client.query(`DELETE FROM chunk_tags WHERE chunk_id = $1`, [chunkId]);
        for (const tag of tags) {
            await client.query(`
        INSERT INTO chunk_tags (chunk_id, tag, confidence)
        VALUES ($1, $2, 1.0)
        `, [chunkId, tag]);
        }
        await client.query("COMMIT");
    }
    catch (err) {
        await client.query("ROLLBACK");
        throw err;
    }
    finally {
        client.release();
    }
}
