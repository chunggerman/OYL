import { Router } from "express";
import ReferenceController from "../ReferenceController";

const router = Router();
const controller = new ReferenceController();

router.get("/chunk/:chunkId", controller.listByChunk);
router.post("/", controller.create);
router.get("/:id", controller.get);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
