import express from "express";
import { IntegrationConfigService } from "../services/IntegrationConfigService";
import { PostgresIntegrationConfigRepository } from "../domain/repositories/PostgresIntegrationConfigRepository";

const router = express.Router();
const service = new IntegrationConfigService(new PostgresIntegrationConfigRepository());

router.get("/:id", async (req, res, next) => {
  try {
    const config = await service.getConfig(req.params.id);
    if (!config) return res.status(404).json({ message: "Not found" });
    res.json(config);
  } catch (err) {
    next(err);
  }
});

export default router;
