"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresTagRepository = void 0;
const db_1 = require("../../db");
class PostgresTagRepository {
    async findById(id) {
        const result = await db_1.db.query(`SELECT id, reference_id, tag, source, created_at
       FROM tags
       WHERE id = $1`, [id]);
        if (result.rowCount === 0)
            return null;
        const row = result.rows[0];
        return {
            id: row.id,
            referenceId: row.reference_id,
            tag: row.tag,
            source: row.source,
            createdAt: row.created_at,
        };
    }
    async findByReference(referenceId) {
        const result = await db_1.db.query(`SELECT id, reference_id, tag, source, created_at
       FROM tags
       WHERE reference_id = $1`, [referenceId]);
        return result.rows.map((row) => ({
            id: row.id,
            referenceId: row.reference_id,
            tag: row.tag,
            source: row.source,
            createdAt: row.created_at,
        }));
    }
    async create(tag) {
        await db_1.db.query(`INSERT INTO tags (id, reference_id, tag, source, created_at)
       VALUES ($1, $2, $3, $4, $5)`, [
            tag.id,
            tag.referenceId,
            tag.tag,
            tag.source,
            tag.createdAt,
        ]);
    }
}
exports.PostgresTagRepository = PostgresTagRepository;
