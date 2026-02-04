import { Router } from "express";
import TagController from "../TagController";

const router = Router();
const controller = new TagController();

router.get("/workspace/:workspaceId", controller.listByWorkspace);
router.post("/", controller.create);
router.get("/:id", controller.get);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
