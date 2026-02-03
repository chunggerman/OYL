"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listTaggedDocuments = listTaggedDocuments;
async function listTaggedDocuments(db, tagId) {
    const result = await db.query(`
    SELECT d.id, d.title, d.content
    FROM documents d
    JOIN tag_links tl ON tl.document_id = d.id
    WHERE tl.tag_id = $1
    ORDER BY d.created_at DESC
    `, [tagId]);
    return result.rows;
}
