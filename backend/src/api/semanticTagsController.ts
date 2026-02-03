import { pool } from "../db";

export async function getSemanticTagsByChunk(req, res) {
  const { chunkId } = req.params;

  try {
    const result = await pool.query(
      `SELECT tag, confidence FROM chunk_tags WHERE chunk_id = $1 ORDER BY tag ASC`,
      [chunkId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("getSemanticTagsByChunk error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function searchSemanticTags(req, res) {
  const { tag } = req.params;

  try {
    const result = await pool.query(
      `SELECT chunk_id, tag, confidence
       FROM chunk_tags
       WHERE tag ILIKE $1
       ORDER BY confidence DESC`,
      [`%${tag}%`]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("searchSemanticTags error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
