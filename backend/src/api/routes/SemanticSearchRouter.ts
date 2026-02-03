import { Router } from "express";
import { SemanticSearchController } from "../SemanticSearchController";

const router = Router();
const controller = new SemanticSearchController();

router.post("/", controller.search);

export default router;
