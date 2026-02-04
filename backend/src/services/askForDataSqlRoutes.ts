import { Router } from "express";
import { AskForDataSqlController } from "../askForDataSqlController";
import { OllamaLlmClient } from "../../providers/llms/OllamaLlmClient";

const llmClient = new OllamaLlmClient();

const router = Router();
const controller = new AskForDataSqlController(llmClient);

router.post("/ask-for-data/sql", (req, res) => controller.handle(req, res));

export default router;
