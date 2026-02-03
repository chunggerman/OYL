"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pg_1 = require("pg");
const writeAuditLog_1 = require("../backend/src/audit/writeAuditLog");
const listAuditLogs_1 = require("../backend/src/audit/listAuditLogs");
const db = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL
});
async function run() {
    const workspaceId = process.argv[2];
    if (!workspaceId) {
        console.error("Usage: npm run audit <workspaceId>");
        process.exit(1);
    }
    const entry = await (0, writeAuditLog_1.writeAuditLog)(db, workspaceId, "demo_event", {
        message: "This is a test audit log entry"
    });
    console.log("Wrote audit log:", entry);
    const logs = await (0, listAuditLogs_1.listAuditLogs)(db, workspaceId);
    console.log("Recent logs:", logs);
    await db.end();
}
run();
