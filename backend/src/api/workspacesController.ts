import { Request, Response } from "express";
import { WorkspaceService } from "../services/WorkspaceService";

export class WorkspaceController {
  private service: WorkspaceService;

  constructor() {
    this.service = new WorkspaceService();
  }

  list = async (req: Request, res: Response) => {
    const { tenantId } = req.params;
    const workspaces = await this.service.list(tenantId);
    res.json(workspaces);
  };

  get = async (req: Request, res: Response) => {
    const { id, tenantId } = req.params;
    const workspace = await this.service.get(id, tenantId);

    if (!workspace) {
      return res.status(404).json({ error: "Workspace not found" });
    }

    res.json(workspace);
  };

  create = async (req: Request, res: Response) => {
    const { tenantId } = req.params;
    const { name } = req.body;

    const workspace = await this.service.create(tenantId, name);
    res.status(201).json(workspace);
  };

  update = async (req: Request, res: Response) => {
    const { id, tenantId } = req.params;
    const { name } = req.body;

    const workspace = await this.service.update(id, tenantId, name);

    if (!workspace) {
      return res.status(404).json({ error: "Workspace not found" });
    }

    res.json(workspace);
  };

  delete = async (req: Request, res: Response) => {
    const { id, tenantId } = req.params;

    await this.service.delete(id, tenantId);
    res.status(204).send();
  };
}
