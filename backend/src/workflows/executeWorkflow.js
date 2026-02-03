"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeWorkflow = executeWorkflow;
const runStep_1 = require("./runStep");
async function executeWorkflow(db, workflowId) {
    const wf = await db.query(`SELECT id, workspace_id, name FROM workflows WHERE id = $1`, [workflowId]);
    if (wf.rows.length === 0) {
        throw new Error("Workflow not found");
    }
    const workflow = wf.rows[0];
    const steps = await db.query(`SELECT id, step_type, config, step_order
     FROM workflow_steps
     WHERE workflow_id = $1
     ORDER BY step_order ASC`, [workflowId]);
    const results = [];
    for (const step of steps.rows) {
        const result = await (0, runStep_1.runStep)(db, step, workflow.workspace_id);
        results.push({ step: step.step_type, result });
    }
    return {
        workflow: workflow.name,
        results
    };
}
