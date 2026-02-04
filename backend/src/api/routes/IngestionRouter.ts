import { Router } from "express";
import IngestionController from "../IngestionController";

const router = Router();
const controller = new IngestionController();

router.get("/datasource/:datasourceId", controller.listByDatasource);
router.post("/", controller.create);
router.get("/:id", controller.get);
router.put("/:id/status", controller.updateStatus);
router.delete("/:id", controller.delete);

export default router;
