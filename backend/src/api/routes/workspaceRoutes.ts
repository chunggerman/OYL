import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware";
import { tenantMiddleware } from "../../middleware/tenantMiddleware";

export const workspaceRoutes = Router();

workspaceRoutes.get(
  "/config",
  authMiddleware,
  tenantMiddleware,
  async (req, res) => {
    res.json({
      workspaceId: req.workspaceId,
      config: {
        model: "gpt-4",
        embeddingModel: "nomic-embed-text",
        temperature: 0.2,
        maxTokens: 2048,
      },
    });
  }
);
