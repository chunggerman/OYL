import { Request, Response } from "express";
import { WorkspaceService } from "../services/WorkspaceService";

export default class WorkspaceController {
  constructor(private service: WorkspaceService) {}

  getById = async (req: Request, res: Response) => {
    try {
      // At this point, isolation middleware already validated:
      // - workspace exists
      // - workspace.ownerId matches X-Tenant-ID
      const workspace = await this.service.getById(req.params.id);
      return res.json(workspace);
    } catch {
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const workspace = await this.service.create(req.body);
      return res.status(201).json(workspace);
    } catch {
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      // Isolation middleware ensures workspace exists + belongs to tenant
      const workspace = await this.service.update(req.params.id, req.body);
      return res.json(workspace);
    } catch {
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      // Isolation middleware ensures workspace exists + belongs to tenant
      await this.service.delete(req.params.id);
      return res.status(200).json({ deleted: true });
    } catch {
      return res.status(500).json({ error: "Internal server error" });
    }
  };
}
