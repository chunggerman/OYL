import { Router } from "express";

import tenantRoutes from "./tenantRoutes";
import workspaceRoutes from "./workspaceRoutes";
import assistantRoutes from "./assistantRoutes";
import documentRoutes from "./documentRoutes";
import ragRoutes from "./ragRoutes";
import askForDataRoutes from "./askForDataRoutes";

const router = Router();

router.use(tenantRoutes);
router.use(workspaceRoutes);
router.use(assistantRoutes);
router.use(documentRoutes);
router.use(ragRoutes);
router.use(askForDataRoutes);

export default router;
