
import express from "express";
import { Pool } from "pg";
import { search } from "../../search/search";

const router = express.Router();
const db = new Pool({ connectionString: process.env.DATABASE_URL });

router.post("/", async (req, res) => {
  const { workspaceId, embedding, filters } = req.body;

  const result = await search(db, workspaceId, embedding, filters || {});
  res.json(result);
});

export default router;
