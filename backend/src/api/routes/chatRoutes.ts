import { Router } from "express";
import { ChatController } from "../chatController";
import { OllamaVectorStoreClient } from "../../providers/vector/OllamaVectorStoreClient";
import { OllamaLlmClient } from "../../providers/llms/OllamaLlmClient";

const vectorStoreClient = new OllamaVectorStoreClient();
const llmClient = new OllamaLlmClient();

const router = Router();
const controller = new ChatController(vectorStoreClient, llmClient);

router.post("/chat", (req, res) => controller.handle(req, res));

export default router;
