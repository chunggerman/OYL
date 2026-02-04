import { Router } from "express";
import { AssistantsController } from "../assistantsController";

const router = Router();

// Create assistant
router.post("/assistants", AssistantsController.createAssistant);

// List assistants
router.get("/assistants", AssistantsController.getAllAssistants);

// Get assistant by ID
router.get("/assistants/:id", AssistantsController.getAssistantById);

// Update assistant
router.put("/assistants/:id", AssistantsController.updateAssistant);

// Delete assistant
router.delete("/assistants/:id", AssistantsController.deleteAssistant);

export default router;
