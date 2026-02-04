import { Router } from "express";
import multer from "multer";
import FileUploadController from "../FileUploadController";

const router = Router();
const controller = new FileUploadController();

const upload = multer({
  dest: "uploads/",
});

router.get("/workspace/:workspaceId", controller.listByWorkspace);
router.post("/", upload.single("file"), controller.upload);
router.get("/:id", controller.get);
router.delete("/:id", controller.delete);

export default router;
