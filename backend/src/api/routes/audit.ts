
import express from "express";
import { Pool } from "pg";
import { listAuditLogs } from "../../audit/listAuditLogs";

const router = express.Router();
const db = new Pool({ connectionString: process.env.DATABASE_URL });

router.get("/:workspaceId", async (req, res) => {
  const logs = await listAuditLogs(db, req.params.workspaceId);
  res.json(logs);
});

export default router;
