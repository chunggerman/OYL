"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResponse = generateResponse;
async function generateResponse(prompt, context) {
    // Placeholder LLM logic — deterministic for now
    const combined = context.join(" ").slice(0, 200);
    return `[DEMO RESPONSE] Prompt: "${prompt}" | Context: "${combined}"`;
}
