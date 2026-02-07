// backend/src/api/WorkspaceController.ts
import { Request, Response } from "express";
import { WorkspaceService } from "../services/WorkspaceService";

export default class WorkspaceController {
  constructor(private service: WorkspaceService) {}

  getById = async (req: Request, res: Response) => {
    try {
      const workspace = await this.service.getById(req.params.id);
      return res.json(workspace);
    } catch (err) {
      console.error("WorkspaceController.getById error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const workspace = await this.service.create(req.body);
      return res.status(201).json(workspace);
    } catch (err) {
      console.error("WorkspaceController.create error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const workspace = await this.service.update(req.params.id, req.body);
      return res.json(workspace);
    } catch (err) {
      console.error("WorkspaceController.update error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      await this.service.delete(req.params.id);
      return res.status(200).json({ deleted: true });
    } catch (err) {
      console.error("WorkspaceController.delete error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
}
