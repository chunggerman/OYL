
import express from "express";
import { Pool } from "pg";
import { createWorkflow } from "../../workflows/createWorkflow";
import { addStep } from "../../workflows/addStep";
import { executeWorkflow } from "../../workflows/executeWorkflow";

const router = express.Router();
const db = new Pool({ connectionString: process.env.DATABASE_URL });

router.post("/", async (req, res) => {
  const { workspaceId, name } = req.body;
  const wf = await createWorkflow(db, workspaceId, name);
  res.json(wf);
});

router.post("/:workflowId/steps", async (req, res) => {
  const { workflowId } = req.params;
  const { stepType, config, order } = req.body;

  const step = await addStep(db, workflowId, stepType, config, order);
  res.json(step);
});

router.post("/:workflowId/execute", async (req, res) => {
  const { workflowId } = req.params;
  const result = await executeWorkflow(db, workflowId);
  res.json(result);
});

export default router;
