import { Router } from "express";
import DatasourceController from "../DatasourceController";

const router = Router();
const controller = new DatasourceController();

router.get("/", controller.list.bind(controller));
router.post("/", controller.create.bind(controller));
router.get("/:id", controller.get.bind(controller));
router.put("/:id", controller.update.bind(controller));
router.delete("/:id", controller.delete.bind(controller));

export default router;
