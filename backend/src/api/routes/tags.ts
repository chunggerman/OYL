
import express from "express";
import { Pool } from "pg";
import { createTag } from "../../tags/manual/createTag";
import { listTags } from "../../tags/manual/listTags";

const router = express.Router();
const db = new Pool({ connectionString: process.env.DATABASE_URL });

router.post("/", async (req, res) => {
  const { workspaceId, name } = req.body;
  const tag = await createTag(db, workspaceId, name);
  res.json(tag);
});

router.get("/:workspaceId", async (req, res) => {
  const tags = await listTags(db, req.params.workspaceId);
  res.json(tags);
});

export default router;
