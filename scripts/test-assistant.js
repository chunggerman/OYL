"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pg_1 = require("pg");
const runAssistant_1 = require("../backend/src/assistant/runAssistant");
const db = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL
});
async function run() {
    const assistantId = process.argv[2];
    const message = process.argv.slice(3).join(" ");
    if (!assistantId || !message) {
        console.error("Usage: npm run assistant <assistantId> <message>");
        process.exit(1);
    }
    const result = await (0, runAssistant_1.runAssistant)(db, assistantId, message);
    console.log(JSON.stringify(result, null, 2));
    await db.end();
}
run();
