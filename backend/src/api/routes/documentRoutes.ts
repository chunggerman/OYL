import { Router } from "express";
import { DocumentsController } from "../documentsController";
import { OllamaVectorStoreClient } from "../../providers/vector/OllamaVectorStoreClient";
import { OllamaLlmClient } from "../../providers/llms/OllamaLlmClient";

const vectorStoreClient = new OllamaVectorStoreClient();
const llmClient = new OllamaLlmClient();

const router = Router();
const controller = new DocumentsController(vectorStoreClient);

router.get("/documents", (req, res) => controller.listDocuments(req, res));
router.get("/documents/:id", (req, res) => controller.getDocument(req, res));
router.post("/documents", (req, res) => controller.createDocument(req, res));
router.delete("/documents/:id", (req, res) => controller.deleteDocument(req, res));

export default router;
