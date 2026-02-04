import { Request, Response } from "express";

class WorkspacesController {
  static async createWorkspace(req: Request, res: Response) {
    res.json({ ok: true, action: "createWorkspace" });
  }

  static async getAllWorkspaces(req: Request, res: Response) {
    res.json({ ok: true, action: "getAllWorkspaces" });
  }

  static async getWorkspaceById(req: Request, res: Response) {
    res.json({ ok: true, action: "getWorkspaceById" });
  }

  static async updateWorkspace(req: Request, res: Response) {
    res.json({ ok: true, action: "updateWorkspace" });
  }

  static async deleteWorkspace(req: Request, res: Response) {
    res.json({ ok: true, action: "deleteWorkspace" });
  }
}

export default WorkspacesController;
