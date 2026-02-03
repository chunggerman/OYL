"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresWorkspaceRepository = void 0;
const db_1 = require("../../db");
class PostgresWorkspaceRepository {
    async findById(id) {
        const result = await db_1.db.query(`SELECT id, tenant_id, name, created_at, updated_at, deleted_at
       FROM workspaces
       WHERE id = $1`, [id]);
        if (result.rowCount === 0)
            return null;
        const row = result.rows[0];
        return {
            id: row.id,
            tenantId: row.tenant_id,
            name: row.name,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            deletedAt: row.deleted_at,
        };
    }
    async findByTenant(tenantId) {
        const result = await db_1.db.query(`SELECT id, tenant_id, name, created_at, updated_at, deleted_at
       FROM workspaces
       WHERE tenant_id = $1 AND deleted_at IS NULL`, [tenantId]);
        return result.rows.map((row) => ({
            id: row.id,
            tenantId: row.tenant_id,
            name: row.name,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            deletedAt: row.deleted_at,
        }));
    }
    async create(workspace) {
        await db_1.db.query(`INSERT INTO workspaces (id, tenant_id, name, created_at, updated_at, deleted_at)
       VALUES ($1, $2, $3, $4, $5, $6)`, [
            workspace.id,
            workspace.tenantId,
            workspace.name,
            workspace.createdAt,
            workspace.updatedAt,
            workspace.deletedAt,
        ]);
    }
}
exports.PostgresWorkspaceRepository = PostgresWorkspaceRepository;
