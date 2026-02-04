// backend/src/api/routes/ValidationRouter.ts

import { Router } from "express";
import { ValidationController } from "../ValidationController";

const router = Router();
const controller = new ValidationController();

// List validations
router.get("/:workspaceId", controller.list);

// Get one validation
router.get("/:workspaceId/:id", controller.get);

// Create validation
router.post("/:workspaceId", controller.create);

// Delete validation
router.delete("/:workspaceId/:id", controller.delete);

export default router;
