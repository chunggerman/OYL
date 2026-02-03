"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listTags = listTags;
async function listTags(db, workspaceId) {
    const result = await db.query(`SELECT id, name, created_at, updated_at
     FROM tags
     WHERE workspace_id = $1
     ORDER BY name ASC`, [workspaceId]);
    return result.rows;
}
