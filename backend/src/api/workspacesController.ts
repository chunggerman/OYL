import { Request, Response } from "express";
import { WorkspaceService } from "../services/WorkspaceService";

const workspaceService = new WorkspaceService();

export class WorkspacesController {
  async listWorkspaces(req: Request, res: Response): Promise<void> {
    const { tenantId } = req.query;
    if (!tenantId || typeof tenantId !== "string") {
      res.status(400).json({ error: "tenantId is required" });
      return;
    }
    const workspaces = await workspaceService.listWorkspacesByTenant(tenantId);
    res.json(workspaces);
  }

  async getWorkspace(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const workspace = await workspaceService.getWorkspaceById(id);
    if (!workspace) {
      res.status(404).json({ error: "Workspace not found" });
      return;
    }
    res.json(workspace);
  }

  async createWorkspace(req: Request, res: Response): Promise<void> {
    const { tenantId, name, description } = req.body;
    if (!tenantId || !name) {
      res.status(400).json({ error: "tenantId and name are required" });
      return;
    }

    const workspace = await workspaceService.createWorkspace(
      tenantId,
      name,
      description ?? null
    );
    res.status(201).json(workspace);
  }

  async deleteWorkspace(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await workspaceService.deleteWorkspace(id);
    res.status(204).send();
  }
}
