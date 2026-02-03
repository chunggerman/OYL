"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAnswerFromContext = generateAnswerFromContext;
const llms_1 = require("../../providers/llms");
const llms_2 = require("../../providers/registry/llms");
const db_1 = require("../../db");
async function getWorkspaceLlmProvider(workspaceId) {
    const res = await db_1.pool.query(`SELECT llm_provider
     FROM workspace_settings
     WHERE workspace_id = $1`, [workspaceId]);
    const row = res.rows[0];
    if (row?.llm_provider)
        return row.llm_provider;
    return llms_2.llmProviders[0].id;
}
async function generateAnswerFromContext(workspaceId, question, contextChunks) {
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
            content: "You are an assistant that answers questions based only on the provided chunks and their tags."
        },
        {
            role: "user",
            content: `Question:\n${question}\n\n` +
                `Here are relevant chunks:\n\n${contextText}\n\n` +
                `Answer the question using only this information. If you are unsure, say you are unsure.`
        }
    ];
    return await (0, llms_1.callLlmById)(providerId, messages);
}
