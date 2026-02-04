// backend/src/api/routes/ConfigRouter.ts

import { Router } from "express";
import { ConfigController } from "../ConfigController";

const router = Router();
const controller = new ConfigController();

// List all config entries for a workspace
router.get("/:workspaceId", controller.list);

// Get a specific config key
router.get("/:workspaceId/:key", controller.get);

// Set/update a config key
router.post("/:workspaceId/:key", controller.set);

// Delete a config key
router.delete("/:workspaceId/:key", controller.delete);

export default router;
