"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresChunkRepository = void 0;
const db_1 = require("../../db");
class PostgresChunkRepository {
    async findById(id) {
        const result = await db_1.db.query(`SELECT id, document_id, position, text, tags_text, created_at, deleted_at
       FROM chunks
       WHERE id = $1`, [id]);
        if (result.rowCount === 0)
            return null;
        const row = result.rows[0];
        return {
            id: row.id,
            documentId: row.document_id,
            position: row.position,
            text: row.text,
            tagsText: row.tags_text,
            createdAt: row.created_at,
            deletedAt: row.deleted_at,
        };
    }
    async findByDocument(documentId) {
        const result = await db_1.db.query(`SELECT id, document_id, position, text, tags_text, created_at, deleted_at
       FROM chunks
       WHERE document_id = $1 AND deleted_at IS NULL
       ORDER BY position ASC`, [documentId]);
        return result.rows.map((row) => ({
            id: row.id,
            documentId: row.document_id,
            position: row.position,
            text: row.text,
            tagsText: row.tags_text,
            createdAt: row.created_at,
            deletedAt: row.deleted_at,
        }));
    }
    async create(chunk) {
        await db_1.db.query(`INSERT INTO chunks (id, document_id, position, text, tags_text, created_at, deleted_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`, [
            chunk.id,
            chunk.documentId,
            chunk.position,
            chunk.text,
            chunk.tagsText,
            chunk.createdAt,
            chunk.deletedAt,
        ]);
    }
}
exports.PostgresChunkRepository = PostgresChunkRepository;
