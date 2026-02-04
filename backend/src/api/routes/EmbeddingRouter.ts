import { Router } from "express";
import EmbeddingController from "../EmbeddingController";

const router = Router();
const controller = new EmbeddingController();

router.get("/chunk/:chunkId", controller.listByChunk);
router.get("/message/:messageId", controller.listByMessage);
router.post("/", controller.create);
router.get("/:id", controller.get);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
