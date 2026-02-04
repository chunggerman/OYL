// backend/src/api/routes/MessageRouter.ts

import { Router } from "express";
import { MessageController } from "../MessageController";

const router = Router();
const controller = new MessageController();

// List messages in a thread
router.get("/:workspaceId/threads/:threadId/messages", controller.list);

// Get one message
router.get("/:workspaceId/messages/:id", controller.get);

// Create message
router.post("/:workspaceId/threads/:threadId/messages", controller.create);

// Delete message
router.delete("/:workspaceId/messages/:id", controller.delete);

export default router;
