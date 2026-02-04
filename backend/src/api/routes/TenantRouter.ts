import { Router } from "express";
import TenantController from "../TenantController";

const router = Router();
const controller = new TenantController();

router.get("/owner/:ownerId", controller.listByOwner);
router.post("/", controller.create);
router.get("/:id", controller.get);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
