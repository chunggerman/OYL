// backend/src/api/routes/DocumentChunkRouter.ts

import { Router, Request, Response, NextFunction } from "express";
import DocumentChunkController from "../DocumentChunkController";

const router = Router({ mergeParams: true });
const controller = new DocumentChunkController();

const workspaceBoundary = (req: Request, res: Response, next: NextFunction) => {
  const header = req.header("X-Workspace-ID") || "";
  const workspaceId = req.params.workspaceId || "";

  if (!header || header !== workspaceId) {
    return res.status(403).json({ error: "Forbidden" });
  }

  next();
};

router.post("/:documentId/chunk", workspaceBoundary, controller.chunkDocument);
router.get("/:documentId/chunks", workspaceBoundary, controller.listChunks);

export default router;
