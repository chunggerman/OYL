import { Router } from "express";
import LLMController from "../LLMController";

const router = Router();
const controller = new LLMController();

router.get("/", controller.list);
router.post("/", controller.create);
router.get("/:id", controller.get);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
