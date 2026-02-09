// backend/src/api/AssistantController.ts

import { Request, Response } from "express";
import { AssistantService } from "../services/AssistantService";
import { PostgresAssistantRepository } from "../domain/repositories/PostgresAssistantRepository";

const service = new AssistantService(new PostgresAssistantRepository());

export default class AssistantController {
  /**
   * List assistants for a workspace
   */
  list = async (req: Request, res: Response) => {
    const workspaceId = req.header("X-Workspace-ID");
    if (!workspaceId) {
      return res.status(400).json({ error: "X-Workspace-ID header is required" });
    }

    const items = await service.list(workspaceId);
    res.json({ items });
  };

  /**
   * Create assistant in a workspace
   */
  create = async (req: Request, res: Response) => {
    const workspaceId = req.header("X-Workspace-ID");
    if (!workspaceId) {
      return res.status(400).json({ error: "X-Workspace-ID header is required" });
    }

    const payload = {
      workspaceId,
      name: req.body.name,
      instruction: req.body.instruction ?? null,
      aiInstruction: req.body.aiInstruction ?? null,
      settingsJson: req.body.settingsJson ?? null,
    };

    const item = await service.create(payload);
    res.status(201).json(item);
  };

  /**
   * Get assistant by ID
   */
  get = async (req: Request, res: Response) => {
    const item = await service.get(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Not found" });
    }
    res.json(item);
  };

  /**
   * Update assistant
   */
  update = async (req: Request, res: Response) => {
    const item = await service.update(req.params.id, req.body);
    if (!item) {
      return res.status(404).json({ error: "Not found" });
    }
    res.json(item);
  };

  /**
   * Soft delete assistant
   */
  delete = async (req: Request, res: Response) => {
    await service.delete(req.params.id);
    res.status(204).send();
  };
}
