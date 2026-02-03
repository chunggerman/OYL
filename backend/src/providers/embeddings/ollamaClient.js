"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOllamaEmbedding = generateOllamaEmbedding;
async function generateOllamaEmbedding(provider, input) {
    const res = await fetch(provider.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: provider.model,
            input
        })
    });
    if (!res.ok) {
        const body = await res.text();
        throw new Error(`Ollama embedding error (${res.status}): ${body}`);
    }
    const json = await res.json();
    if (Array.isArray(json.embedding)) {
        return json.embedding;
    }
    if (Array.isArray(json.embeddings) && Array.isArray(json.embeddings[0])) {
        return json.embeddings[0];
    }
    throw new Error("Unexpected Ollama embedding response shape");
}
