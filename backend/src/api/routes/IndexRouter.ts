// backend/src/api/routes/IndexRouter.ts

import { Router } from "express";

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
import WorkspaceRouter from "./WorkspaceRouter";
import TenantRouter from "./TenantRouter";

// ------------------------------
// Instruction module imports
// ------------------------------
import InstructionRouter, {
  bindInstructionController,
} from "./InstructionRouter";

import InstructionController from "../InstructionController";

// ✅ CORRECT PATH (2 levels up)
import { PostgresInstructionRepository } from "../../domain/repositories/PostgresInstructionRepository";

import { InstructionService } from "../../services/InstructionService";

import { WorkspaceService } from "../../services/WorkspaceService";
import { PostgresWorkspaceRepository } from "../../domain/repositories/PostgresWorkspaceRepository";

import { AssistantService } from "../../services/AssistantService";
import { PostgresAssistantRepository } from "../../domain/repositories/PostgresAssistantRepository";

// ------------------------------
// Build Instruction module dependencies
// ------------------------------
const instructionRepo = new PostgresInstructionRepository();
const workspaceRepo = new PostgresWorkspaceRepository();
const assistantRepo = new PostgresAssistantRepository();

const workspaceService = new WorkspaceService(workspaceRepo);
const assistantService = new AssistantService(assistantRepo);

const instructionService = new InstructionService(
  instructionRepo,
  workspaceService,
  assistantService
);

const instructionController = new InstructionController(instructionService);

// Bind controller to router
bindInstructionController(instructionController);

// ------------------------------
// Main router
// ------------------------------
const IndexRouter = Router();

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

// ------------------------------
// Instruction routes
// ------------------------------
IndexRouter.use("/", InstructionRouter);

IndexRouter.use("/workspaces", WorkspaceRouter);
IndexRouter.use("/tenants", TenantRouter);

export default IndexRouter;
