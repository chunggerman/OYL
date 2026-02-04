import { Router } from "express";
import UserRouter from "./UserRouter";
import tenantRoutes from "./tenantRoutes";

const router = Router();

router.use("/users", UserRouter);
router.use("/", tenantRoutes);

export default router;
