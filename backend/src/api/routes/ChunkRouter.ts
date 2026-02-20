// backend/src/api/routes/DocumentChunkRouter.ts

import { Router } from "express";
import DocumentChunkController from "../DocumentChunkController";

const router = Router();
const controller = new DocumentChunkController();

router.post("/:documentId/chunk", controller.chunkDocument);
router.get("/:documentId/chunks", controller.listChunks);

export default router;
