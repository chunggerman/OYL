"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresEmbeddingRepository = void 0;
const db_1 = require("../../db");
class PostgresEmbeddingRepository {
    async findById(id) {
        const result = await db_1.db.query(`SELECT id, chunk_id, vector_ref, created_at
       FROM embeddings
       WHERE id = $1`, [id]);
        if (result.rowCount === 0)
            return null;
        const row = result.rows[0];
        return {
            id: row.id,
            chunkId: row.chunk_id,
            vectorRef: row.vector_ref,
            createdAt: row.created_at,
        };
    }
    async findByChunk(chunkId) {
        const result = await db_1.db.query(`SELECT id, chunk_id, vector_ref, created_at
       FROM embeddings
       WHERE chunk_id = $1`, [chunkId]);
        return result.rows.map((row) => ({
            id: row.id,
            chunkId: row.chunk_id,
            vectorRef: row.vector_ref,
            createdAt: row.created_at,
        }));
    }
    async create(embedding) {
        await db_1.db.query(`INSERT INTO embeddings (id, chunk_id, vector_ref, created_at)
       VALUES ($1, $2, $3, $4)`, [
            embedding.id,
            embedding.chunkId,
            embedding.vectorRef,
            embedding.createdAt,
        ]);
    }
}
exports.PostgresEmbeddingRepository = PostgresEmbeddingRepository;
