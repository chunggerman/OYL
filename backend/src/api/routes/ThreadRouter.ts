// backend/src/api/routes/ThreadRouter.ts

import { Router } from "express";
import { ThreadController } from "../ThreadController";

const router = Router();
const controller = new ThreadController();

// List threads
router.get("/:workspaceId", controller.list);

// Get one thread
router.get("/:workspaceId/:id", controller.get);

// Create thread
router.post("/:workspaceId", controller.create);

// Update thread
router.put("/:workspaceId/:id", controller.update);

// Delete thread
router.delete("/:workspaceId/:id", controller.delete);

export default router;
