import express from "express";
import { WorkflowStepService } from "../services/WorkflowStepService";
import { PostgresWorkflowStepRepository } from "../domain/repositories/PostgresWorkflowStepRepository";

const router = express.Router();
const service = new WorkflowStepService(new PostgresWorkflowStepRepository());

router.get("/:id", async (req, res, next) => {
  try {
    const step = await service.getStep(req.params.id);
    if (!step) return res.status(404).json({ message: "Not found" });
    res.json(step);
  } catch (err) {
    next(err);
  }
});

export default router;
