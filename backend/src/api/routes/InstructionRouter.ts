// backend/src/api/routes/InstructionRouter.ts

import { Router } from "express";
import InstructionController from "../InstructionController";

const router = Router();

// Controller instance will be injected in server.ts or IndexRouter
let controller: InstructionController | null = null;

// Allow late binding (same pattern as some modular routers)
export const bindInstructionController = (c: InstructionController) => {
  controller = c;
};

// ------------------------------
// Workspace‑scoped routes
// ------------------------------
router.post(
  "/workspaces/:workspaceId/instructions",
  (req, res) => controller!.create(req, res)
);

router.get(
  "/workspaces/:workspaceId/instructions",
  (req, res) => controller!.listByWorkspace(req, res)
);

// ------------------------------
// Instruction‑scoped routes
// ------------------------------
router.get(
  "/instructions/:instructionId",
  (req, res) => controller!.getById(req, res)
);

router.patch(
  "/instructions/:instructionId",
  (req, res) => controller!.update(req, res)
);

router.delete(
  "/instructions/:instructionId",
  (req, res) => controller!.delete(req, res)
);

// ------------------------------
// AI refine
// ------------------------------
router.post(
  "/instructions/:instructionId/refine",
  (req, res) => controller!.refine(req, res)
);

// ------------------------------
// Assistant linking
// ------------------------------
router.post(
  "/assistants/:assistantId/instructions/:instructionId",
  (req, res) => controller!.linkToAssistant(req, res)
);

export default router;
