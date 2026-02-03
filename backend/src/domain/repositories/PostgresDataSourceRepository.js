"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresDataSourceRepository = void 0;
const db_1 = require("../../db");
class PostgresDataSourceRepository {
    async findById(id) {
        const result = await db_1.db.query(`SELECT id, workspace_id, name, schema_json, row_count, created_at, updated_at, deleted_at
       FROM data_sources
       WHERE id = $1`, [id]);
        if (result.rowCount === 0)
            return null;
        const row = result.rows[0];
        return {
            id: row.id,
            workspaceId: row.workspace_id,
            name: row.name,
            schemaJson: row.schema_json,
            rowCount: row.row_count,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            deletedAt: row.deleted_at,
        };
    }
    async findByWorkspace(workspaceId) {
        const result = await db_1.db.query(`SELECT id, workspace_id, name, schema_json, row_count, created_at, updated_at, deleted_at
       FROM data_sources
       WHERE workspace_id = $1 AND deleted_at IS NULL`, [workspaceId]);
        return result.rows.map((row) => ({
            id: row.id,
            workspaceId: row.workspace_id,
            name: row.name,
            schemaJson: row.schema_json,
            rowCount: row.row_count,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            deletedAt: row.deleted_at,
        }));
    }
    async create(dataSource) {
        await db_1.db.query(`INSERT INTO data_sources (id, workspace_id, name, schema_json, row_count, created_at, updated_at, deleted_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [
            dataSource.id,
            dataSource.workspaceId,
            dataSource.name,
            dataSource.schemaJson,
            dataSource.rowCount,
            dataSource.createdAt,
            dataSource.updatedAt,
            dataSource.deletedAt,
        ]);
    }
}
exports.PostgresDataSourceRepository = PostgresDataSourceRepository;
