import express from "express";
import { TagService } from "../services/TagService";
import { PostgresTagRepository } from "../domain/repositories/PostgresTagRepository";

const router = express.Router();
const service = new TagService(new PostgresTagRepository());

router.get("/:id", async (req, res, next) => {
  try {
    const tag = await service.getTag(req.params.id);
    if (!tag) return res.status(404).json({ message: "Not found" });
    res.json(tag);
  } catch (err) {
    next(err);
  }
});

export default router;
