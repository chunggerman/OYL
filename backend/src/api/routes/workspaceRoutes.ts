import { Router } from "express";
import { WorkspacesController } from "../workspacesController";

const router = Router();
const controller = new WorkspacesController();

router.get("/workspaces", (req, res) => controller.listWorkspaces(req, res));
router.get("/workspaces/:id", (req, res) => controller.getWorkspace(req, res));
router.post("/workspaces", (req, res) => controller.createWorkspace(req, res));
router.delete("/workspaces/:id", (req, res) => controller.deleteWorkspace(req, res));

export default router;
