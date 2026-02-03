import { Router } from "express";
import { MessageController } from "../MessageController";

const router = Router();
const controller = new MessageController();

router.get("/", controller.list);
router.get("/:id", controller.get);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
