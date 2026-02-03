"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pg_1 = require("pg");
const registerIntegration_1 = require("../backend/src/integrations/registerIntegration");
const runIntegration_1 = require("../backend/src/integrations/runIntegration");
const ingestExternalData_1 = require("../backend/src/integrations/ingestExternalData");
const db = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL
});
async function run() {
    const workspaceId = process.argv[2];
    if (!workspaceId) {
        console.error("Usage: npm run integrations <workspaceId>");
        process.exit(1);
    }
    const integration = await (0, registerIntegration_1.registerIntegration)(db, workspaceId, "webhook", {
        url: "https://example.com/hook"
    });
    console.log("Registered integration:", integration);
    const runInfo = await (0, runIntegration_1.runIntegration)(db, integration.id);
    console.log("Integration run:", runInfo);
    const doc = await (0, ingestExternalData_1.ingestExternalData)(db, workspaceId, runInfo.runId, "External Data", "This content was ingested from an integration.");
    console.log("Ingested external document:", doc);
    await db.end();
}
run();
