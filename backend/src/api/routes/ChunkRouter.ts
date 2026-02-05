import { Router } from "express";
import ChunkController from "../ChunkController";

const router = Router();
const controller = new ChunkController();

router.get("/", controller.list.bind(controller));
router.get("/datasource/:datasourceId", controller.listByDatasource.bind(controller));
router.post("/", controller.create.bind(controller));
router.get("/:id", controller.get.bind(controller));
router.put("/:id", controller.update.bind(controller));
router.delete("/:id", controller.delete.bind(controller));

export default router;
