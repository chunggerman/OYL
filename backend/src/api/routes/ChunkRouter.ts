import { Router } from "express";
import { ChunkController } from "../ChunkController";

const router = Router();
const controller = new ChunkController();

router.get("/", controller.list);
router.get("/:id", controller.get);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
