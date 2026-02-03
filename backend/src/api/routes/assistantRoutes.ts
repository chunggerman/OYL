import { Router } from "express";
import { AssistantsController } from "../assistantsController";

const router = Router();
const controller = new AssistantsController();

router.get("/assistants", (req, res) => controller.listAssistants(req, res));
router.get("/assistants/:id", (req, res) => controller.getAssistant(req, res));
router.post("/assistants", (req, res) => controller.createAssistant(req, res));
router.delete("/assistants/:id", (req, res) => controller.deleteAssistant(req, res));

export default router;
