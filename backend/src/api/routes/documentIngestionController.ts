import { Router } from "express";
import { ingestFileAsImages } from "../../services/ingestion/ingestFileAsImages";

const router = Router();

// Expect: workspaceId, documentId, filePath (already uploaded to disk)
router.post("/ingest-file", async (req, res, next) => {
  try {
    const { workspaceId, documentId, filePath } = req.body;
    if (!workspaceId || !documentId || !filePath) {
      return res.status(400).json({ error: "workspaceId, documentId, filePath required" });
    }

    await ingestFileAsImages(workspaceId, documentId, filePath);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router;
