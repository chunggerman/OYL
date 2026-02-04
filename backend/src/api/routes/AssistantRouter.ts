import { Router } from "express";
import AssistantController from "../AssistantController";

const router = Router();
const controller = new AssistantController();

router.get("/", controller.list);
router.post("/", controller.create);
router.get("/:id", controller.get);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
