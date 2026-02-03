"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmbeddingProviderById = getEmbeddingProviderById;
exports.generateEmbeddingById = generateEmbeddingById;
const embeddings_1 = require("../registry/embeddings");
const ollamaClient_1 = require("./ollamaClient");
const path_1 = __importDefault(require("path"));
function getEmbeddingProviderById(id) {
    const provider = embeddings_1.embeddingProviders.find(p => p.id === id);
    if (!provider) {
        throw new Error("Unknown embedding provider: " + id);
    }
    return provider;
}
async function generateEmbeddingById(providerId, input, options) {
    const provider = getEmbeddingProviderById(providerId);
    // DeepSeek‑OCR requires special formatting
    if (provider.id === "deepseek-ocr") {
        if (!options?.isImage) {
            throw new Error("DeepSeek‑OCR embedding requires image input. Provide { isImage: true }.");
        }
        const absolute = path_1.default.resolve(input);
        const formatted = `${absolute}\n<|grounding|>Extract semantic meaning of this page.`;
        return (0, ollamaClient_1.generateOllamaEmbedding)(provider, formatted);
    }
    // Normal text embedding models
    return (0, ollamaClient_1.generateOllamaEmbedding)(provider, input);
}
