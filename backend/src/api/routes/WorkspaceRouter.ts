import { Router } from "express";
import WorkspaceController from "../WorkspaceController";

const router = Router();
const controller = new WorkspaceController();

router.get("/user/:userId", controller.listByUser);
router.post("/", controller.create);
router.get("/:id", controller.get);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
