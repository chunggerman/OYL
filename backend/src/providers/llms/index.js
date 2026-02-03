"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLlmProviderById = getLlmProviderById;
exports.callLlmById = callLlmById;
const llms_1 = require("../registry/llms");
const ollamaClient_1 = require("./ollamaClient");
function getLlmProviderById(id) {
    const provider = llms_1.llmProviders.find(p => p.id === id);
    if (!provider) {
        throw new Error("Unknown LLM provider: " + id);
    }
    return provider;
}
async function callLlmById(providerId, messages) {
    const provider = getLlmProviderById(providerId);
    switch (provider.type) {
        case "ollama":
            return (0, ollamaClient_1.callOllamaLLM)(provider, messages);
        default:
            throw new Error("Unsupported LLM provider type: " + provider.type);
    }
}
