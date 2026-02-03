"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractOcrText = extractOcrText;
exports.extractOcrTextLLM = extractOcrTextLLM;
const embeddingService_1 = require("../rag/embeddingService");
const embeddings_1 = require("../../providers/registry/embeddings");
const db_1 = require("../../db");
async function getWorkspaceEmbeddingProvider(workspaceId) {
    const res = await db_1.pool.query(`SELECT embedding_provider
     FROM workspace_settings
     WHERE workspace_id = $1`, [workspaceId]);
    const row = res.rows[0];
    if (row?.embedding_provider)
        return row.embedding_provider;
    return embeddings_1.embeddingProviders[0].id;
}
async function extractOcrText(workspaceId, imagePath) {
    const providerId = await getWorkspaceEmbeddingProvider(workspaceId);
    if (providerId !== "deepseek-ocr") {
        throw new Error("OCR extraction requires DeepSeek-OCR as the embedding provider.");
    }
    const input = `${imagePath}\n<|grounding|>Extract all readable text from this page. Return plain text only.`;
    const vector = await (0, embeddingService_1.generateEmbeddingById)(providerId, input, {
        isImage: true
    });
    return "[OCR text extraction placeholder: DeepSeek-OCR returns embeddings only. Use LLM call for text extraction.]";
}
const llms_1 = require("../../providers/llms");
async function extractOcrTextLLM(workspaceId, imagePath) {
    const providerId = "deepseek-ocr-llm";
    const messages = [
        {
            role: "user",
            content: `${imagePath}\n<|grounding|>Extract all readable text from this page. Return plain text only.`
        }
    ];
    const text = await (0, llms_1.callLlmById)(providerId, messages);
    return text.trim();
}
