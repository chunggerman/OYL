// backend/src/api/ValidationController.ts

import { Request, Response } from "express";
import { ValidationService } from "../services/ValidationService";

export class ValidationController {
  private service: ValidationService;

  constructor() {
    this.service = new ValidationService();
  }

  list = async (req: Request, res: Response) => {
    const { workspaceId } = req.params;
    const validations = await this.service.list(workspaceId);
    res.json(validations);
  };

  get = async (req: Request, res: Response) => {
    const { id, workspaceId } = req.params;
    const validation = await this.service.get(id, workspaceId);

    if (!validation) {
      return res.status(404).json({ error: "Validation not found" });
    }

    res.json(validation);
  };

  create = async (req: Request, res: Response) => {
    const { workspaceId } = req.params;
    const { input } = req.body;

    const validation = await this.service.create(workspaceId, input);
    res.status(201).json(validation);
  };

  delete = async (req: Request, res: Response) => {
    const { id, workspaceId } = req.params;

    await this.service.delete(id, workspaceId);
    res.status(204).send();
  };
}
