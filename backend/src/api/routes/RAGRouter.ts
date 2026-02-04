// backend/src/api/routes/RAGRouter.ts

import { Router } from "express";
import { RAGController } from "../RAGController";

const router = Router();
const controller = new RAGController();

router.post("/:workspaceId/generate", controller.generate);

export default router;
