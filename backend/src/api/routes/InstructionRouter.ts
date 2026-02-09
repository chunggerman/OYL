// backend/src/api/routes/InstructionRouter.ts

import { Router } from "express";
import InstructionController from "../InstructionController";

const router = Router();
const controller = new InstructionController();

/**
 * Workspace‑scoped instruction routes
 */

// Create instruction
router.post(
  "/workspaces/:workspaceId/instructions",
  controller.create
);

// List instructions by workspace  ⭐ FIX FOR INS‑007
router.get(
  "/workspaces/:workspaceId/instructions",
  controller.listByWorkspace
);

// Get instruction
router.get(
  "/instructions/:id",
  controller.get
);

// Update instruction
router.patch(
  "/instructions/:id",
  controller.update
);

// Delete instruction
router.delete(
  "/instructions/:id",
  controller.delete
);

// Refine instruction (AI)
router.post(
  "/instructions/:id/refine",
  controller.refine
);

// Link instruction to assistant
router.post(
  "/assistants/:assistantId/instructions/:instructionId",
  controller.linkToAssistant
);

export default router;
