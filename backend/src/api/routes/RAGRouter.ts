import { Router } from "express";
import RAGController from "../RAGController";

const router = Router();
const controller = new RAGController();

router.get("/chat/:chatId", controller.listByChat);
router.get("/message/:messageId", controller.listByMessage);
router.post("/", controller.create);
router.get("/:id", controller.get);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
