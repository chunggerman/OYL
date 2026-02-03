import { Router } from "express";
import { AskForDataController } from "../askForDataController";
import { OllamaVectorStoreClient } from "../../providers/vector/OllamaVectorStoreClient";
import { OllamaLlmClient } from "../../providers/llms/OllamaLlmClient";

const vectorStoreClient = new OllamaVectorStoreClient();
const llmClient = new OllamaLlmClient();

const router = Router();
const controller = new AskForDataController(vectorStoreClient, llmClient);

router.post("/ask-for-data", (req, res) => controller.handle(req, res));

export default router;
