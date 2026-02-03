"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pg_1 = require("pg");
const crypto_1 = require("crypto");
const db = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL
});
async function seed() {
    console.log("Seeding database...");
    const tenantId = (0, crypto_1.randomUUID)();
    const workspaceId = (0, crypto_1.randomUUID)();
    const assistantId = (0, crypto_1.randomUUID)();
    const referenceId = (0, crypto_1.randomUUID)();
    const documentId = (0, crypto_1.randomUUID)();
    // TENANT
    await db.query(`INSERT INTO tenants (id, name, created_at, updated_at)
     VALUES ($1, 'Demo Tenant', NOW(), NOW())`, [tenantId]);
    // WORKSPACE
    await db.query(`INSERT INTO workspaces (id, tenant_id, name, created_at, updated_at)
     VALUES ($1, $2, 'Demo Workspace', NOW(), NOW())`, [workspaceId, tenantId]);
    // ASSISTANT
    await db.query(`INSERT INTO assistants (id, workspace_id, name, created_at, updated_at)
     VALUES ($1, $2, 'Demo Assistant', NOW(), NOW())`, [assistantId, workspaceId]);
    // REFERENCE ITEM
    await db.query(`INSERT INTO reference_items (id, workspace_id, name, description, created_at, updated_at)
     VALUES ($1, $2, 'Demo Reference', 'Seed reference item', NOW(), NOW())`, [referenceId, workspaceId]);
    // DOCUMENT
    await db.query(`INSERT INTO documents (id, workspace_id, reference_id, title, content, created_at, updated_at)
     VALUES ($1, $2, $3, 'Demo Document', 'This is a seeded document.', NOW(), NOW())`, [documentId, workspaceId, referenceId]);
    console.log("DONE");
    await db.end();
}
seed().catch(err => {
    console.error(err);
    process.exit(1);
});
