import { Router } from "express";
import WorkspacesController from "../workspacesController";

const router = Router();

router.post("/workspaces", (req, res) => WorkspacesController.createWorkspace(req, res));
router.get("/workspaces", (req, res) => WorkspacesController.getAllWorkspaces(req, res));
router.get("/workspaces/:id", (req, res) => WorkspacesController.getWorkspaceById(req, res));
router.put("/workspaces/:id", (req, res) => WorkspacesController.updateWorkspace(req, res));
router.delete("/workspaces/:id", (req, res) => WorkspacesController.deleteWorkspace(req, res));

export default router;
