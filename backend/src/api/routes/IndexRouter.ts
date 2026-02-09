//backend/src/api/routes/IndexRouter.ts

import { Router } from "express";

import InstructionRouter from "./InstructionRouter";
import WorkspaceRouter from "./WorkspaceRouter";
import AssistantRouter from "./AssistantRouter";
import ChatRouter from "./ChatRouter";
import ChunkRouter from "./ChunkRouter";
import ConfigRouter from "./ConfigRouter";
import DatasourceRouter from "./DatasourceRouter";
import DocumentsourceRouter from "./DocumentsourceRouter";
import EmbeddingRouter from "./EmbeddingRouter";
import FileUploadRouter from "./FileUploadRouter";
import HealthRouter from "./HealthRouter";
import IngestionRouter from "./IngestionRouter";
import IntegrationRouter from "./IntegrationRouter";
import MessageRouter from "./MessageRouter";
import RAGRouter from "./RAGRouter";
import ReferenceRouter from "./ReferenceRouter";
import SemanticSearchRouter from "./SemanticSearchRouter";
import TagRouter from "./TagRouter";
import ThreadRouter from "./ThreadRouter";
import UserRouter from "./UserRouter";
import TenantRouter from "./TenantRouter";

const IndexRouter = Router();

// --------------------------------------------------
// INSTRUCTION ROUTES FIRST
// --------------------------------------------------
IndexRouter.use("/", InstructionRouter);

// --------------------------------------------------
// ⭐ CRITICAL FIX ⭐
// WorkspaceRouter MUST be mounted at root
// so it can handle /tenants/:tenantId/workspaces
// --------------------------------------------------
IndexRouter.use("/", WorkspaceRouter);

// --------------------------------------------------
// Other routers
// --------------------------------------------------
IndexRouter.use("/assistants", AssistantRouter);
IndexRouter.use("/chats", ChatRouter);
IndexRouter.use("/chunks", ChunkRouter);
IndexRouter.use("/configs", ConfigRouter);
IndexRouter.use("/datasources", DatasourceRouter);
IndexRouter.use("/documentsource", DocumentsourceRouter);
IndexRouter.use("/embeddings", EmbeddingRouter);
IndexRouter.use("/files", FileUploadRouter);
IndexRouter.use("/health", HealthRouter);
IndexRouter.use("/ingestions", IngestionRouter);
IndexRouter.use("/integrations", IntegrationRouter);
IndexRouter.use("/messages", MessageRouter);
IndexRouter.use("/rag", RAGRouter);
IndexRouter.use("/references", ReferenceRouter);
IndexRouter.use("/semantic-search", SemanticSearchRouter);
IndexRouter.use("/tags", TagRouter);
IndexRouter.use("/threads", ThreadRouter);
IndexRouter.use("/users", UserRouter);
IndexRouter.use("/tenants", TenantRouter);

export default IndexRouter;
