import { Router } from "express";

import AuthRouter from "./AuthRouter";
import ChunkRouter from "./ChunkRouter";
import ConfigRouter from "./ConfigRouter";
import DocumentRouter from "./DocumentRouter";
import EmbeddingRouter from "./EmbeddingRouter";
import ErrorRouter from "./ErrorRouter";
import FileUploadRouter from "./FileUploadRouter";
import HealthRouter from "./HealthRouter";
import LLMRouter from "./LLMRouter";
import MessageRouter from "./MessageRouter";
import RAGRouter from "./RAGRouter";
import SemanticSearchRouter from "./SemanticSearchRouter";
import TagRouter from "./TagRouter";
import ThreadRouter from "./ThreadRouter";
import UserRouter from "./UserRouter";
import ValidationRouter from "./ValidationRouter";
import WorkspaceRouter from "./WorkspaceRouter";
import tenantRoutes from "./tenantRoutes";

const router = Router();

// Health first
router.use("/health", HealthRouter);

// Core domain routes
router.use("/auth", AuthRouter);
router.use("/chunks", ChunkRouter);
router.use("/config", ConfigRouter);
router.use("/documents", DocumentRouter);
router.use("/embeddings", EmbeddingRouter);
router.use("/errors", ErrorRouter);
router.use("/upload", FileUploadRouter);
router.use("/llm", LLMRouter);
router.use("/messages", MessageRouter);
router.use("/rag", RAGRouter);
router.use("/semantic-search", SemanticSearchRouter);
router.use("/tags", TagRouter);
router.use("/threads", ThreadRouter);
router.use("/users", UserRouter);
router.use("/validation", ValidationRouter);
router.use("/workspaces", WorkspaceRouter);

// Tenants
router.use("/tenants", tenantRoutes);

export default router;
