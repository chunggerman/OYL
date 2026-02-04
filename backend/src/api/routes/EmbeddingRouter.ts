// backend/src/api/routes/EmbeddingRouter.ts

import { Router } from "express";
import { EmbeddingController } from "../EmbeddingController";

const router = Router();
const controller = new EmbeddingController();

// List embeddings by chunk
router.get(
  "/:workspaceId/chunks/:chunkId/embeddings",
  controller.listByChunk
);

// Get a single embedding
router.get(
  "/:workspaceId/embeddings/:id",
  controller.get
);

// Create embedding
router.post(
  "/:workspaceId/chunks/:chunkId/embeddings",
  controller.create
);

// Delete embedding
router.delete(
  "/:workspaceId/embeddings/:id",
  controller.delete
);

export default router;
