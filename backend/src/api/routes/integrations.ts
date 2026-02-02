
import express from "express";
import { Pool } from "pg";
import { registerIntegration } from "../../integrations/registerIntegration";
import { runIntegration } from "../../integrations/runIntegration";

const router = express.Router();
const db = new Pool({ connectionString: process.env.DATABASE_URL });

router.post("/", async (req, res) => {
  const { workspaceId, type, config } = req.body;
  const integration = await registerIntegration(db, workspaceId, type, config);
  res.json(integration);
});

router.post("/:integrationId/run", async (req, res) => {
  const { integrationId } = req.params;
  const result = await runIntegration(db, integrationId);
  res.json(result);
});

export default router;
