"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pg_1 = require("pg");
const createWorkflow_1 = require("../backend/src/workflows/createWorkflow");
const addStep_1 = require("../backend/src/workflows/addStep");
const executeWorkflow_1 = require("../backend/src/workflows/executeWorkflow");
const db = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL
});
async function run() {
    const workspaceId = process.argv[2];
    if (!workspaceId) {
        console.error("Usage: npm run workflows <workspaceId>");
        process.exit(1);
    }
    const wf = await (0, createWorkflow_1.createWorkflow)(db, workspaceId, "Demo Workflow");
    console.log("Created workflow:", wf);
    await (0, addStep_1.addStep)(db, wf.id, "log", { message: "Starting workflow" }, 1);
    await (0, addStep_1.addStep)(db, wf.id, "search", { filters: {} }, 2);
    await (0, addStep_1.addStep)(db, wf.id, "log", { message: "Workflow complete" }, 3);
    const result = await (0, executeWorkflow_1.executeWorkflow)(db, wf.id);
    console.log(JSON.stringify(result, null, 2));
    await db.end();
}
run();
