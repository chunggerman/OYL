import express from "express";
import { WorkspaceService } from "../services/WorkspaceService";
import { PostgresWorkspaceRepository } from "../domain/repositories/PostgresWorkspaceRepository";

const router = express.Router();
const service = new WorkspaceService(new PostgresWorkspaceRepository());

router.get("/:id", async (req, res, next) => {
  try {
    const workspace = await service.getWorkspace(req.params.id);
    if (!workspace) return res.status(404).json({ message: "Not found" });
    res.json(workspace);
  } catch (err) {
    next(err);
  }
});

export default router;
