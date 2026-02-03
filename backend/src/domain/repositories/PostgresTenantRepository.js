"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresTenantRepository = void 0;
const db_1 = require("../../db");
class PostgresTenantRepository {
    async findById(id) {
        const result = await db_1.db.query(`SELECT id, name, metadata_json, created_at, updated_at, deleted_at
       FROM tenants
       WHERE id = $1`, [id]);
        if (result.rowCount === 0)
            return null;
        const row = result.rows[0];
        return {
            id: row.id,
            name: row.name,
            metadataJson: row.metadata_json,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            deletedAt: row.deleted_at,
        };
    }
    async findManyByIds(ids) {
        if (ids.length === 0)
            return [];
        const result = await db_1.db.query(`SELECT id, name, metadata_json, created_at, updated_at, deleted_at
       FROM tenants
       WHERE id = ANY($1)`, [ids]);
        return result.rows.map((row) => ({
            id: row.id,
            name: row.name,
            metadataJson: row.metadata_json,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            deletedAt: row.deleted_at,
        }));
    }
    async create(tenant) {
        await db_1.db.query(`INSERT INTO tenants (id, name, metadata_json, created_at, updated_at, deleted_at)
       VALUES ($1, $2, $3, $4, $5, $6)`, [
            tenant.id,
            tenant.name,
            tenant.metadataJson,
            tenant.createdAt,
            tenant.updatedAt,
            tenant.deletedAt,
        ]);
    }
}
exports.PostgresTenantRepository = PostgresTenantRepository;
