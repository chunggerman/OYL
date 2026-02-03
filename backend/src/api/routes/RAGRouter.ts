import { Router } from "express";
import { RAGController } from "../RAGController";

const router = Router();
const controller = new RAGController();

router.post("/", controller.query);

export default router;
