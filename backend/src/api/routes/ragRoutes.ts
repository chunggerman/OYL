import { Router } from "express";
import { RagController } from "../ragController";
import { OllamaVectorStoreClient } from "../../providers/vector/OllamaVectorStoreClient";
import { OllamaLlmClient } from "../../providers/llms/OllamaLlmClient";

const vectorStoreClient = new OllamaVectorStoreClient();
const llmClient = new OllamaLlmClient();

const router = Router();
const controller = new RagController(vectorStoreClient, llmClient);

router.post("/rag/complete", (req, res) => controller.complete(req, res));

export default router;
