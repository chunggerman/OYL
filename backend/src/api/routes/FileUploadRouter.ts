import { Router } from "express";
import { FileUploadController } from "../FileUploadController";

const router = Router();
const controller = new FileUploadController();

router.post("/:workspaceId", controller.upload);

export default router;
