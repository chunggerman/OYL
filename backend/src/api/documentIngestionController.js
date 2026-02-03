"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ingestFileAsImages_1 = require("../services/ingestion/ingestFileAsImages");
const router = (0, express_1.Router)();
// Expect: workspaceId, documentId, filePath (already uploaded to disk)
router.post("/ingest-file", async (req, res, next) => {
    try {
        const { workspaceId, documentId, filePath } = req.body;
        if (!workspaceId || !documentId || !filePath) {
            return res.status(400).json({ error: "workspaceId, documentId, filePath required" });
        }
        await (0, ingestFileAsImages_1.ingestFileAsImages)(workspaceId, documentId, filePath);
        res.json({ success: true });
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
