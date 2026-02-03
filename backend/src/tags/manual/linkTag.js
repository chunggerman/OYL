"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkTagToDocument = linkTagToDocument;
exports.linkTagToReference = linkTagToReference;
const crypto_1 = require("crypto");
async function linkTagToDocument(db, tagId, documentId) {
    await db.query(`INSERT INTO tag_links (id, tag_id, document_id, created_at)
     VALUES ($1, $2, $3, NOW())`, [(0, crypto_1.randomUUID)(), tagId, documentId]);
}
async function linkTagToReference(db, tagId, referenceId) {
    await db.query(`INSERT INTO tag_links (id, tag_id, reference_id, created_at)
     VALUES ($1, $2, $3, NOW())`, [(0, crypto_1.randomUUID)(), tagId, referenceId]);
}
