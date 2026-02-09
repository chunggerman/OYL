// backend/src/api/InstructionController.ts

import { Request, Response } from "express";
import { InstructionService } from "../services/InstructionService";
import { PostgresInstructionRepository } from "../domain/repositories/PostgresInstructionRepository";
import { WorkspaceService } from "../services/WorkspaceService";
import { AssistantService } from "../services/AssistantService";
import { PostgresWorkspaceRepository } from "../domain/repositories/PostgresWorkspaceRepository";
import { PostgresAssistantRepository } from "../domain/repositories/PostgresAssistantRepository";

const instructionRepo = new PostgresInstructionRepository();
const workspaceService = new WorkspaceService(new PostgresWorkspaceRepository());
const assistantService = new AssistantService(new PostgresAssistantRepository());

const service = new InstructionService(
  instructionRepo,
  workspaceService,
  assistantService
);

export default class InstructionController {
  /**
   * Create instruction
   */
  create = async (req: Request, res: Response) => {
    const workspaceId = req.params.workspaceId;
    const headerWorkspaceId = req.header("X-Workspace-ID");

    if (!headerWorkspaceId || headerWorkspaceId !== workspaceId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const { name, content } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Name is required" });
    }

    if (!content || content.trim() === "") {
      return res.status(400).json({ error: "Content is required" });
    }

    const item = await service.createInstruction(workspaceId, { name, content });
    res.status(201).json(item);
  };

  /**
   * Get instruction
   */
  get = async (req: Request, res: Response) => {
    const workspaceId = req.header("X-Workspace-ID");
    if (!workspaceId) {
      return res.status(400).json({ error: "X-Workspace-ID header is required" });
    }

    const item = await service.getInstruction(req.params.id);

    if (!item) {
      return res.status(404).json({ error: "Instruction not found" });
    }

    if (item.workspaceId !== workspaceId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    res.json(item);
  };

  /**
   * List instructions by workspace
   */
  listByWorkspace = async (req: Request, res: Response) => {
    const workspaceId = req.params.workspaceId;
    const headerWorkspaceId = req.header("X-Workspace-ID");

    if (!headerWorkspaceId || headerWorkspaceId !== workspaceId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const items = await service.listInstructions(workspaceId);
    res.json({ items });
  };

  /**
   * Update instruction
   */
  update = async (req: Request, res: Response) => {
    const workspaceId = req.header("X-Workspace-ID");
    if (!workspaceId) {
      return res.status(400).json({ error: "X-Workspace-ID header is required" });
    }

    const item = await service.getInstruction(req.params.id);

    if (!item) {
      return res.status(404).json({ error: "Instruction not found" });
    }

    if (item.workspaceId !== workspaceId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const updated = await service.updateInstruction(req.params.id, req.body);
    res.json(updated);
  };

  /**
   * Delete instruction
   */
  delete = async (req: Request, res: Response) => {
    const workspaceId = req.header("X-Workspace-ID");
    if (!workspaceId) {
      return res.status(400).json({ error: "X-Workspace-ID header is required" });
    }

    const item = await service.getInstruction(req.params.id);

    if (!item) {
      return res.status(404).json({ error: "Instruction not found" });
    }

    if (item.workspaceId !== workspaceId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    await service.deleteInstruction(req.params.id);
    res.json({ success: true });
  };

  /**
   * AI refine instruction
   */
  refine = async (req: Request, res: Response) => {
    const workspaceId = req.header("X-Workspace-ID");
    if (!workspaceId) {
      return res.status(400).json({ error: "X-Workspace-ID header is required" });
    }

    const instructionId = req.params.id;
    const debugFailAI = req.header("X-Debug-Fail-AI") === "true";

    try {
      const refined = await service.refineInstruction(instructionId, {
        debugFailAI,
      });
      res.json(refined);
    } catch (err: any) {
      res.status(err.status || 500).json({ error: err.message });
    }
  };

  /**
   * Link instruction to assistant
   */
  linkToAssistant = async (req: Request, res: Response) => {
    const workspaceId = req.header("X-Workspace-ID");
    if (!workspaceId) {
      return res.status(400).json({ error: "X-Workspace-ID header is required" });
    }

    const assistantId = req.params.assistantId;
    const instructionId = req.params.instructionId;

    // Validate instruction
    const instruction = await service.getInstruction(instructionId);
    if (!instruction) {
      return res.status(404).json({ error: "Instruction not found" });
    }

    if (instruction.workspaceId !== workspaceId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    // Validate assistant
    const assistant = await assistantService.get(assistantId);
    if (!assistant) {
      return res.status(404).json({ error: "Assistant not found" });
    }

    if (assistant.workspaceId !== workspaceId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    // Link
    await service.linkToAssistant(assistantId, instructionId);

    res.json({ success: true });
  };
}
