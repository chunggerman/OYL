"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runIntegration = runIntegration;
const validateIntegration_1 = require("./validateIntegration");
const crypto_1 = require("crypto");
async function runIntegration(db, integrationId) {
    const result = await db.query(`SELECT id, workspace_id, type, config
     FROM integration_configs
     WHERE id = $1`, [integrationId]);
    if (result.rows.length === 0) {
        throw new Error("Integration not found");
    }
    const integration = result.rows[0];
    (0, validateIntegration_1.validateIntegrationConfig)(integration.type, integration.config);
    const runId = (0, crypto_1.randomUUID)();
    await db.query(`INSERT INTO data_sources (id, workspace_id, integration_id, created_at)
     VALUES ($1, $2, $3, NOW())`, [runId, integration.workspace_id, integration.id]);
    return {
        integration: integration.type,
        runId
    };
}
