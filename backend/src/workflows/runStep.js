"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runStep = runStep;
const search_1 = require("../search/search");
const runAssistant_1 = require("../assistant/runAssistant");
async function runStep(db, step, workspaceId) {
    const type = step.step_type;
    const config = step.config;
    if (type === "search") {
        const fakeEmbedding = new Array(128).fill(0.1);
        return await (0, search_1.search)(db, workspaceId, fakeEmbedding, config.filters || {});
    }
    if (type === "assistant") {
        return await (0, runAssistant_1.runAssistant)(db, config.assistantId, config.message);
    }
    if (type === "log") {
        console.log("Workflow log:", config.message);
        return { logged: true };
    }
    return { error: "Unknown step type" };
}
