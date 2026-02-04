import { Router } from "express";
import SemanticSearchController from "../SemanticSearchController";

const router = Router();
const controller = new SemanticSearchController();

router.get("/", controller.list);
router.post("/", controller.create);
router.get("/:id", controller.get);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
