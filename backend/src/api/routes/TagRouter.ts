// backend/src/api/routes/TagRouter.ts

import { Router } from "express";
import { TagController } from "../TagController";

const router = Router();
const controller = new TagController();

// List tags
router.get("/:workspaceId", controller.list);

// Get one tag
router.get("/:workspaceId/:id", controller.get);

// Create tag
router.post("/:workspaceId", controller.create);

// Update tag
router.put("/:workspaceId/:id", controller.update);

// Delete tag
router.delete("/:workspaceId/:id", controller.delete);

export default router;
