"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresDocumentRepository = void 0;
const db_1 = require("../../db");
class PostgresDocumentRepository {
    async findById(id) {
        const result = await db_1.db.query(`SELECT id, reference_id, filename, mime_type, size_bytes, metadata_json, text, created_at, updated_at, deleted_at
       FROM documents
       WHERE id = $1`, [id]);
        if (result.rowCount === 0)
            return null;
        const row = result.rows[0];
        return {
            id: row.id,
            referenceId: row.reference_id,
            filename: row.filename,
            mimeType: row.mime_type,
            sizeBytes: row.size_bytes,
            metadataJson: row.metadata_json,
            text: row.text,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            deletedAt: row.deleted_at,
        };
    }
    async findByReference(referenceId) {
        const result = await db_1.db.query(`SELECT id, reference_id, filename, mime_type, size_bytes, metadata_json, text, created_at, updated_at, deleted_at
       FROM documents
       WHERE reference_id = $1 AND deleted_at IS NULL`, [referenceId]);
        return result.rows.map((row) => ({
            id: row.id,
            referenceId: row.reference_id,
            filename: row.filename,
            mimeType: row.mime_type,
            sizeBytes: row.size_bytes,
            metadataJson: row.metadata_json,
            text: row.text,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            deletedAt: row.deleted_at,
        }));
    }
    async create(doc) {
        await db_1.db.query(`INSERT INTO documents (id, reference_id, filename, mime_type, size_bytes, metadata_json, text, created_at, updated_at, deleted_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`, [
            doc.id,
            doc.referenceId,
            doc.filename,
            doc.mimeType,
            doc.sizeBytes,
            doc.metadataJson,
            doc.text,
            doc.createdAt,
            doc.updatedAt,
            doc.deletedAt,
        ]);
    }
}
exports.PostgresDocumentRepository = PostgresDocumentRepository;
