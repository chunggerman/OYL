import { Router } from "express";
import HealthController from "../HealthController";

const router = Router();
const controller = new HealthController();

router.get("/", controller.check);

export default router;
