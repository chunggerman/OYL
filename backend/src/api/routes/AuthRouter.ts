import { Router } from "express";
import { AuthController } from "../AuthController";

const router = Router();
const controller = new AuthController();

router.post("/login", controller.login);
router.post("/logout", controller.logout);
router.post("/refresh", controller.refresh);

export default router;
