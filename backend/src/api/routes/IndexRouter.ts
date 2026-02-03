import { Router } from "express";

import WorkspaceRouter from "./WorkspaceRouter";
import UserRouter from "./UserRouter";
import ThreadRouter from "./ThreadRouter";
import MessageRouter from "./MessageRouter";
import DocumentRouter from "./DocumentRouter";
import ChunkRouter from "./ChunkRouter";
import EmbeddingRouter from "./EmbeddingRouter";
import ValidationRouter from "./ValidationRouter";
import SemanticSearchRouter from "./SemanticSearchRouter";
import TagRouter from "./TagRouter";
import FileUploadRouter from "./FileUploadRouter";
import LLMRouter from "./LLMRouter";
import RAGRouter from "./RAGRouter";
import ConfigRouter from "./ConfigRouter";
import AuthRouter from "./AuthRouter";
import HealthRouter from "./HealthRouter";

const router = Router();

router.use("/workspaces", WorkspaceRouter);
router.use("/users", UserRouter);
router.use("/threads", ThreadRouter);
router.use("/messages", MessageRouter);
router.use("/documents", DocumentRouter);
router.use("/chunks", ChunkRouter);
router.use("/embeddings", EmbeddingRouter);
router.use("/validation", ValidationRouter);
router.use("/semantic-search", SemanticSearchRouter);
router.use("/tags", TagRouter);
router.use("/upload", FileUploadRouter);
router.use("/llm", LLMRouter);
router.use("/rag", RAGRouter);
router.use("/config", ConfigRouter);
router.use("/auth", AuthRouter);
router.use("/health", HealthRouter);

export default router;
