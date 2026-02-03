import { Router } from "express";
import { LLMController } from "../LLMController";

const router = Router();
const controller = new LLMController();

router.post("/", controller.generate);

export default router;
