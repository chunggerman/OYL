import { pool } from "../db";

export async function getSemanticTagsByChunk(req, res) {
  const { chunkId } = req.params;
  const result = await pool.query(
    `SELECT tag, confidence FROM chunk_tags WHERE chunk_id = $1`,
    [chunkId]
  );
  res.json(result.rows);
}

export async function searchSemanticTags(req, res) {
  const { tag } = req.params;
  const result = await pool.query(
    `SELECT chunk_id, tag, confidence FROM chunk_tags WHERE tag ILIKE $1`,
    [`%${tag}%`]
  );
  res.json(result.rows);
}
