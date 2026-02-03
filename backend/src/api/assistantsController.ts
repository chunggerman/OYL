import { Request, Response } from "express";
import { AssistantService } from "../services/AssistantService";

const assistantService = new AssistantService();

export class AssistantsController {
  async listAssistants(req: Request, res: Response): Promise<void> {
    const { workspaceId } = req.query;
    if (!workspaceId || typeof workspaceId !== "string") {
      res.status(400).json({ error: "workspaceId is required" });
      return;
    }
    const assistants = await assistantService.listAssistantsByWorkspace(workspaceId);
    res.json(assistants);
  }

  async getAssistant(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const assistant = await assistantService.getAssistantById(id);
    if (!assistant) {
      res.status(404).json({ error: "Assistant not found" });
      return;
    }
    res.json(assistant);
  }

  async createAssistant(req: Request, res: Response): Promise<void> {
    const { workspaceId, name, instruction, aiInstruction, settingsJson } = req.body;
    if (!workspaceId || !name) {
      res.status(400).json({ error: "workspaceId and name are required" });
      return;
    }

    const assistant = await assistantService.createAssistant({
      workspaceId,
      name,
      instruction: instruction ?? null,
      aiInstruction: aiInstruction ?? null,
      settingsJson: settingsJson ?? null,
    });

    res.status(201).json(assistant);
  }

  async deleteAssistant(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await assistantService.deleteAssistant(id);
    res.status(204).send();
  }
}
