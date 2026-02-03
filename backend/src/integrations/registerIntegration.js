"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerIntegration = registerIntegration;
const crypto_1 = require("crypto");
async function registerIntegration(db, workspaceId, type, config) {
    const id = (0, crypto_1.randomUUID)();
    await db.query(`INSERT INTO integration_configs (id, workspace_id, type, config, created_at, updated_at)
     VALUES ($1, $2, $3, $4, NOW(), NOW())`, [id, workspaceId, type, config]);
    return { id, type };
}
