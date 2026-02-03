"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSemanticTagsByChunk = getSemanticTagsByChunk;
exports.searchSemanticTags = searchSemanticTags;
const db_1 = require("../db");
async function getSemanticTagsByChunk(req, res) {
    const { chunkId } = req.params;
    try {
        const result = await db_1.pool.query(`SELECT tag, confidence FROM chunk_tags WHERE chunk_id = $1 ORDER BY tag ASC`, [chunkId]);
        res.json(result.rows);
    }
    catch (err) {
        console.error("getSemanticTagsByChunk error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}
async function searchSemanticTags(req, res) {
    const { tag } = req.params;
    try {
        const result = await db_1.pool.query(`SELECT chunk_id, tag, confidence
       FROM chunk_tags
       WHERE tag ILIKE $1
       ORDER BY confidence DESC`, [`%${tag}%`]);
        res.json(result.rows);
    }
    catch (err) {
        console.error("searchSemanticTags error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}
