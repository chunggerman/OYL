// backend/src/api/routes/AssistantRouter.ts

import { Router } from "express";
import AssistantController from "../AssistantController";

const router = Router();
const controller = new AssistantController();

/**
 * Workspace‑scoped assistant routes
 * All require X-Workspace-ID header
 */

router.get("/", controller.list);
router.post("/", controller.create);
router.get("/:id", controller.get);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
