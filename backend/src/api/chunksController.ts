import express from "express";
import { ChunkService } from "../services/ChunkService";
import { PostgresChunkRepository } from "../domain/repositories/PostgresChunkRepository";

const router = express.Router();
const service = new ChunkService(new PostgresChunkRepository());

router.get("/:id", async (req, res, next) => {
  try {
    const chunk = await service.getChunk(req.params.id);
    if (!chunk) return res.status(404).json({ message: "Not found" });
    res.json(chunk);
  } catch (err) {
    next(err);
  }
});

export default router;
