import { Router } from "express";
import { RetrievalPipeline } from "../../services/RetrievalPipeline";
import { authMiddleware } from "../../middleware/authMiddleware";
import { tenantMiddleware } from "../../middleware/tenantMiddleware";

export const retrievalRoutes = Router();
const pipeline = new RetrievalPipeline();

retrievalRoutes.post(
  "/run",
  authMiddleware,
  tenantMiddleware,
  async (req, res, next) => {
    try {
      const result = await pipeline.run({
        workspaceId: req.workspaceId!,
        query: req.body.query,
        queryVector: req.body.queryVector,
        queryTags: req.body.queryTags || [],
        topK: req.body.topK || 5,
        configSources: {
          workspaceConfig: req.body.workspaceConfig,
          requestOverrides: req.body.requestOverrides,
        },
      });

      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);
