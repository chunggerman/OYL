"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadAssistant = loadAssistant;
async function loadAssistant(db, assistantId) {
    const result = await db.query(`SELECT id, workspace_id, name, created_at, updated_at
     FROM assistants
     WHERE id = $1`, [assistantId]);
    if (result.rows.length === 0) {
        throw new Error("Assistant not found");
    }
    return result.rows[0];
}
