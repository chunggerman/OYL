import { Router } from "express";
import { search } from "../../search/search";
import { ragQuery } from "../../services/rag/ragService";
import { ragQuerySchema } from "../../validation/ragSchemas";

const router = Router();

// Basic search route (kept minimal, same import path as before)
router.post("/", async (req, res) => {
  try {
    const result = await search(req.body);
    res.json(result);
  } catch (err) {
    console.error("search route error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// RAG route with validation (Step 3)
router.post("/rag", async (req, res) => {
  const parsed = ragQuerySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json(parsed.error);
  }

  const { workspaceId, query } = parsed.data;

  try {
    const result = await ragQuery(workspaceId, query);
    res.json(result);
  } catch (err) {
    console.error("rag route error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
