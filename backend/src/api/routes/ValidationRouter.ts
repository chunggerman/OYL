import { Router } from "express";
import ValidationController from "../ValidationController";

const router = Router();
const controller = new ValidationController();

router.get("/", controller.list);
router.post("/", controller.create);
router.get("/:id", controller.get);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
