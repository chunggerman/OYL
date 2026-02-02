import express from "express";
import { EmbeddingService } from "../services/EmbeddingService";
import { PostgresEmbeddingRepository } from "../domain/repositories/PostgresEmbeddingRepository";

const router = express.Router();
const service = new EmbeddingService(new PostgresEmbeddingRepository());

router.get("/:id", async (req, res, next) => {
  try {
    const embedding = await service.getEmbedding(req.params.id);
    if (!embedding) return res.status(404).json({ message: "Not found" });
    res.json(embedding);
  } catch (err) {
    next(err);
  }
});

export default router;
