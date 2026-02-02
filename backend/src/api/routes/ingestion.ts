
import express from "express";
import { Pool } from "pg";
import { ingestDocument } from "../../ingestion/ingestDocument";

const router = express.Router();
const db = new Pool({ connectionString: process.env.DATABASE_URL });

router.post("/", async (req, res) => {
  const { workspaceId, title, content } = req.body;

  const result = await ingestDocument(db, workspaceId, title, content);
  res.json(result);
});

export default router;
