import { Router } from "express";
import ThreadController from "../ThreadController";

const router = Router();
const controller = new ThreadController();

router.get("/workspace/:workspaceId", controller.listByWorkspace);
router.post("/", controller.create);
router.get("/:id", controller.get);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
