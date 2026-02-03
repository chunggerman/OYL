"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresAssistantRepository = void 0;
const db_1 = require("../../db");
class PostgresAssistantRepository {
    async findById(id) {
        const result = await db_1.db.query(`SELECT id, workspace_id, name, instruction, ai_instruction, settings_json, created_at, updated_at, deleted_at
       FROM assistants
       WHERE id = $1`, [id]);
        if (result.rowCount === 0)
            return null;
        const row = result.rows[0];
        return {
            id: row.id,
            workspaceId: row.workspace_id,
            name: row.name,
            instruction: row.instruction,
            aiInstruction: row.ai_instruction,
            settingsJson: row.settings_json,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            deletedAt: row.deleted_at,
        };
    }
    async findByWorkspace(workspaceId) {
        const result = await db_1.db.query(`SELECT id, workspace_id, name, instruction, ai_instruction, settings_json, created_at, updated_at, deleted_at
       FROM assistants
       WHERE workspace_id = $1 AND deleted_at IS NULL`, [workspaceId]);
        return result.rows.map((row) => ({
            id: row.id,
            workspaceId: row.workspace_id,
            name: row.name,
            instruction: row.instruction,
            aiInstruction: row.ai_instruction,
            settingsJson: row.settings_json,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            deletedAt: row.deleted_at,
        }));
    }
    async create(assistant) {
        await db_1.db.query(`INSERT INTO assistants (id, workspace_id, name, instruction, ai_instruction, settings_json, created_at, updated_at, deleted_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [
            assistant.id,
            assistant.workspaceId,
            assistant.name,
            assistant.instruction,
            assistant.aiInstruction,
            assistant.settingsJson,
            assistant.createdAt,
            assistant.updatedAt,
            assistant.deletedAt,
        ]);
    }
}
exports.PostgresAssistantRepository = PostgresAssistantRepository;
