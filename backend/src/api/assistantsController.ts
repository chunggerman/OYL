import express from "express";
import { AssistantService } from "../services/AssistantService";
import { PostgresAssistantRepository } from "../domain/repositories/PostgresAssistantRepository";

const router = express.Router();
const service = new AssistantService(new PostgresAssistantRepository());

router.get("/:id", async (req, res, next) => {
  try {
    const assistant = await service.getAssistant(req.params.id);
    if (!assistant) return res.status(404).json({ message: "Not found" });
    res.json(assistant);
  } catch (err) {
    next(err);
  }
});

export default router;
