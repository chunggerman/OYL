"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAssistant = runAssistant;
const loadAssistant_1 = require("./loadAssistant");
const generateResponse_1 = require("./generateResponse");
const logInteraction_1 = require("./logInteraction");
const search_1 = require("../search/search");
async function runAssistant(db, assistantId, userMessage) {
    const assistant = await (0, loadAssistant_1.loadAssistant)(db, assistantId);
    const fakeEmbedding = new Array(128).fill(0.1);
    const searchResults = await (0, search_1.search)(db, assistant.workspace_id, fakeEmbedding, {});
    const context = searchResults.vector.map((c) => c.content);
    const response = await (0, generateResponse_1.generateResponse)(userMessage, context);
    await (0, logInteraction_1.logInteraction)(db, assistantId, userMessage, response);
    return {
        assistant: assistant.name,
        response,
        contextUsed: context
    };
}
