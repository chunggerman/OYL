import { Request, Response } from "express";
import { PostgresWorkspaceRepository } from "../domain/repositories/PostgresWorkspaceRepository";

export default class WorkspaceController {
  private repository;

  constructor() {
    this.repository = new PostgresWorkspaceRepository();
  }

  async list(req: Request, res: Response) {
    try {
      const items = await this.repository.list();
      res.json({ items });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to list workspaces" });
    }
  }

  async listByUser(req: Request, res: Response) {
    try {
      const items = await this.repository.listByUser(req.params.userId);
      res.json({ items });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to list workspaces by user" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const item = await this.repository.create(req.body);
      res.json(item);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create workspace" });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const item = await this.repository.get(req.params.id);
      res.json(item);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to get workspace" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const item = await this.repository.update(req.params.id, req.body);
      res.json(item);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update workspace" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.repository.delete(req.params.id);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete workspace" });
    }
  }
}
