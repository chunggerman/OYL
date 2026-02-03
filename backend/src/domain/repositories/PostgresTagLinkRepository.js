"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresTagLinkRepository = void 0;
const db_1 = require("../../db");
class PostgresTagLinkRepository {
    async findById(id) {
        const result = await db_1.db.query(`SELECT id, tag_id, chunk_id, created_at
       FROM tag_links
       WHERE id = $1`, [id]);
        if (result.rowCount === 0)
            return null;
        const row = result.rows[0];
        return {
            id: row.id,
            tagId: row.tag_id,
            chunkId: row.chunk_id,
            createdAt: row.created_at,
        };
    }
    async findByChunk(chunkId) {
        const result = await db_1.db.query(`SELECT id, tag_id, chunk_id, created_at
       FROM tag_links
       WHERE chunk_id = $1`, [chunkId]);
        return result.rows.map((row) => ({
            id: row.id,
            tagId: row.tag_id,
            chunkId: row.chunk_id,
            createdAt: row.created_at,
        }));
    }
    async create(tagLink) {
        await db_1.db.query(`INSERT INTO tag_links (id, tag_id, chunk_id, created_at)
       VALUES ($1, $2, $3, $4)`, [
            tagLink.id,
            tagLink.tagId,
            tagLink.chunkId,
            tagLink.createdAt,
        ]);
    }
}
exports.PostgresTagLinkRepository = PostgresTagLinkRepository;
