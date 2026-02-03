"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresWorkflowRepository = void 0;
const db_1 = require("../../db");
class PostgresWorkflowRepository {
    async findById(id) {
        const result = await db_1.db.query(`SELECT id, workspace_id, name, description, created_at, updated_at, deleted_at
       FROM workflows
       WHERE id = $1`, [id]);
        if (result.rowCount === 0)
            return null;
        const row = result.rows[0];
        return {
            id: row.id,
            workspaceId: row.workspace_id,
            name: row.name,
            description: row.description,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            deletedAt: row.deleted_at,
        };
    }
    async findByWorkspace(workspaceId) {
        const result = await db_1.db.query(`SELECT id, workspace_id, name, description, created_at, updated_at, deleted_at
       FROM workflows
       WHERE workspace_id = $1 AND deleted_at IS NULL`, [workspaceId]);
        return result.rows.map((row) => ({
            id: row.id,
            workspaceId: row.workspace_id,
            name: row.name,
            description: row.description,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            deletedAt: row.deleted_at,
        }));
    }
    async create(workflow) {
        await db_1.db.query(`INSERT INTO workflows (id, workspace_id, name, description, created_at, updated_at, deleted_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`, [
            workflow.id,
            workflow.workspaceId,
            workflow.name,
            workflow.description,
            workflow.createdAt,
            workflow.updatedAt,
            workflow.deletedAt,
        ]);
    }
}
exports.PostgresWorkflowRepository = PostgresWorkflowRepository;
