import { Router } from "express";
import { EmbeddingController } from "../EmbeddingController";

const router = Router();
const controller = new EmbeddingController();

router.get("/", controller.list);
router.get("/:id", controller.get);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
