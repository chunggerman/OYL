import { Router } from "express";
import { UserController } from "../UserController";

const router = Router();
const controller = new UserController();

router.get("/", controller.list);
router.get("/:id", controller.get);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
