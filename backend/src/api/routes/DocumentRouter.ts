// backend/src/api/routes/DocumentRouter.ts

import { Router } from "express";
import multer from "multer";

import { DocumentController } from "../DocumentController";
import { DocumentService } from "../../services/DocumentService";
import { PostgresDocumentRepository } from "../../domain/repositories/PostgresDocumentRepository";

const upload = multer({
  dest: "storage/documents/",
  limits: { fileSize: 20 * 1024 * 1024 },
});

const repo = new PostgresDocumentRepository();
const service = new DocumentService(repo);
const controller = new DocumentController(service);

export const documentRouter = Router();

// Upload
documentRouter.post(
  "/workspaces/:workspaceId/documents/upload",
  upload.single("file"),
  controller.upload
);

// List
documentRouter.get(
  "/workspaces/:workspaceId/documents",
  controller.listDocuments
);

// REAL FIX: prevent DocumentRouter from swallowing chunking routes
documentRouter.use((req, res, next) => {
  if (req.path.match(/^\/workspaces\/[^/]+\/documents\/chunking\//)) {
    return next("router"); // <-- this exits DocumentRouter entirely
  }
  next();
});

// Single document
documentRouter.get("/documents/:documentId", controller.getDocument);
documentRouter.delete("/documents/:documentId", controller.deleteDocument);
