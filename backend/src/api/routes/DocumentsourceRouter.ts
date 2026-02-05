import { Router } from "express";
//import DocumentSourceController from "../DocumentsourceController";
import DocumentsourceController from "../DocumentsourceController";
const router = Router();
const controller = new DocumentsourceController();

router.get("/", controller.list.bind(controller));
router.post("/", controller.create.bind(controller));
router.get("/:id", controller.get.bind(controller));
router.put("/:id", controller.update.bind(controller));
router.delete("/:id", controller.delete.bind(controller));

export default router;
