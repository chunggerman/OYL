import express from "express";
import { DocumentService } from "../services/DocumentService";
import { PostgresDocumentRepository } from "../domain/repositories/PostgresDocumentRepository";

const router = express.Router();
const service = new DocumentService(new PostgresDocumentRepository());

router.get("/:id", async (req, res, next) => {
  try {
    const doc = await service.getDocument(req.params.id);
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (err) {
    next(err);
  }
});

export default router;
