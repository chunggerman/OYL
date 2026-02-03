"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStep = addStep;
const crypto_1 = require("crypto");
async function addStep(db, workflowId, stepType, config, order) {
    const id = (0, crypto_1.randomUUID)();
    await db.query(`INSERT INTO workflow_steps (id, workflow_id, step_type, config, step_order, created_at)
     VALUES ($1, $2, $3, $4, $5, NOW())`, [id, workflowId, stepType, config, order]);
    return { id, stepType, order };
}
