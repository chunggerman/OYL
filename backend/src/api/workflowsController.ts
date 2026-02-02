import express from "express";
import { WorkflowService } from "../services/WorkflowService";
import { PostgresWorkflowRepository } from "../domain/repositories/PostgresWorkflowRepository";

const router = express.Router();
const service = new WorkflowService(new PostgresWorkflowRepository());

router.get("/:id", async (req, res, next) => {
  try {
    const workflow = await service.getWorkflow(req.params.id);
    if (!workflow) return res.status(404).json({ message: "Not found" });
    res.json(workflow);
  } catch (err) {
    next(err);
  }
});

export default router;
