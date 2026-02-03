"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresIntegrationConfigRepository = void 0;
const db_1 = require("../../db");
class PostgresIntegrationConfigRepository {
    async findById(id) {
        const result = await db_1.db.query(`SELECT id, workspace_id, type_enum, config_encrypted_json, created_at, updated_at, deleted_at
       FROM integration_configs
       WHERE id = $1`, [id]);
        if (result.rowCount === 0)
            return null;
        const row = result.rows[0];
        return {
            id: row.id,
            workspaceId: row.workspace_id,
            typeEnum: row.type_enum,
            configEncryptedJson: row.config_encrypted_json,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            deletedAt: row.deleted_at,
        };
    }
    async findByWorkspace(workspaceId) {
        const result = await db_1.db.query(`SELECT id, workspace_id, type_enum, config_encrypted_json, created_at, updated_at, deleted_at
       FROM integration_configs
       WHERE workspace_id = $1 AND deleted_at IS NULL`, [workspaceId]);
        return result.rows.map((row) => ({
            id: row.id,
            workspaceId: row.workspace_id,
            typeEnum: row.type_enum,
            configEncryptedJson: row.config_encrypted_json,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            deletedAt: row.deleted_at,
        }));
    }
    async create(config) {
        await db_1.db.query(`INSERT INTO integration_configs (id, workspace_id, type_enum, config_encrypted_json, created_at, updated_at, deleted_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`, [
            config.id,
            config.workspaceId,
            config.typeEnum,
            config.configEncryptedJson,
            config.createdAt,
            config.updatedAt,
            config.deletedAt,
        ]);
    }
}
exports.PostgresIntegrationConfigRepository = PostgresIntegrationConfigRepository;
