import { Router } from "express";
import { ConfigController } from "../ConfigController";

const router = Router();
const controller = new ConfigController();

router.get("/:workspaceId", controller.get);
router.put("/:workspaceId", controller.update);

export default router;
