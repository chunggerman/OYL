import { Router } from "express";
import ConfigController from "../ConfigController";

const router = Router();
const controller = new ConfigController();

router.get("/workspace/:workspaceId", controller.listByWorkspace);
router.post("/", controller.create);
router.get("/:id", controller.get);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
