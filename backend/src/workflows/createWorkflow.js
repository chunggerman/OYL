"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWorkflow = createWorkflow;
const crypto_1 = require("crypto");
async function createWorkflow(db, workspaceId, name) {
    const id = (0, crypto_1.randomUUID)();
    await db.query(`INSERT INTO workflows (id, workspace_id, name, created_at, updated_at)
     VALUES ($1, $2, $3, NOW(), NOW())`, [id, workspaceId, name]);
    return { id, name };
}
