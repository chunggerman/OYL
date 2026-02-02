import express from "express";
import { TagLinkService } from "../services/TagLinkService";
import { PostgresTagLinkRepository } from "../domain/repositories/PostgresTagLinkRepository";

const router = express.Router();
const service = new TagLinkService(new PostgresTagLinkRepository());

router.get("/:id", async (req, res, next) => {
  try {
    const tagLink = await service.getTagLink(req.params.id);
    if (!tagLink) return res.status(404).json({ message: "Not found" });
    res.json(tagLink);
  } catch (err) {
    next(err);
  }
});

export default router;
