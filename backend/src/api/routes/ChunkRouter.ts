import { Router } from "express";
import ChunkController from "../ChunkController";

const router = Router();
const controller = new ChunkController();

router.get("/datasource/:datasourceId", controller.listByDatasource);
router.post("/", controller.create);
router.get("/:id", controller.get);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
