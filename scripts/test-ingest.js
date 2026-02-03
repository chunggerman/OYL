"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pg_1 = require("pg");
const ingestDocument_1 = require("../backend/src/ingestion/ingestDocument");
const db = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL
});
async function run() {
    const workspaceId = process.argv[2];
    if (!workspaceId) {
        console.error("Usage: npm run ingest <workspaceId>");
        process.exit(1);
    }
    const result = await (0, ingestDocument_1.ingestDocument)(db, workspaceId, "Test Document", "This is a long test document that will be chunked and embedded...");
    console.log("Ingested document:", result.documentId);
    await db.end();
}
run();
