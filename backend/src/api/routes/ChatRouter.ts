import { Router } from "express";
import ChatController from "../ChatController";

const router = Router();
const controller = new ChatController();

router.get("/user/:userId", controller.listByUser);
router.post("/", controller.create);
router.get("/:id", controller.get);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
