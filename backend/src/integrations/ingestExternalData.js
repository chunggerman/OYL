"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingestExternalData = ingestExternalData;
const crypto_1 = require("crypto");
async function ingestExternalData(db, workspaceId, sourceId, title, content) {
    const id = (0, crypto_1.randomUUID)();
    await db.query(`INSERT INTO documents (id, workspace_id, title, content, source_id, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, NOW(), NOW())`, [id, workspaceId, title, content, sourceId]);
    return { id, title };
}
