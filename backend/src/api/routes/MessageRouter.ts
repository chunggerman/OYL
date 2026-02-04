import { Router } from "express";
import MessageController from "../MessageController";

const router = Router();
const controller = new MessageController();

router.get("/chat/:chatId", controller.listByChat);
router.post("/", controller.create);
router.get("/:id", controller.get);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
