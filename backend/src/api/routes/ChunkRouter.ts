// backend/src/api/routes/ChunkRouter.ts

import { Router } from "express";
import { ChunkController } from "../ChunkController";

const router = Router();
const controller = new ChunkController();

// List chunks
router.get("/:workspaceId", controller.list);

// Get one chunk
router.get("/:workspaceId/:id", controller.get);

// Create chunk
router.post("/:workspaceId", controller.create);

// Update chunk
router.put("/:workspaceId/:id", controller.update);

// Delete chunk
router.delete("/:workspaceId/:id", controller.delete);

export default router;
