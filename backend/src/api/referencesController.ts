import express from "express";
import { ReferenceService } from "../services/ReferenceService";
import { PostgresReferenceRepository } from "../domain/repositories/PostgresReferenceRepository";

const router = express.Router();
const service = new ReferenceService(new PostgresReferenceRepository());

router.get("/:id", async (req, res, next) => {
  try {
    const reference = await service.getReference(req.params.id);
    if (!reference) return res.status(404).json({ message: "Not found" });
    res.json(reference);
  } catch (err) {
    next(err);
  }
});

export default router;
