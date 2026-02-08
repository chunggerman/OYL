// backend/src/api/InstructionController.ts

import { Request, Response } from "express";
import { InstructionService } from "../services/InstructionService";

export default class InstructionController {
  constructor(private service: InstructionService) {}

  // ----------------------------------------
  // POST /workspaces/:workspaceId/instructions
  // ----------------------------------------
  create = async (req: Request, res: Response) => {
    try {
      const { workspaceId } = req.params;
      const { name, content } = req.body;

      const instruction = await this.service.createInstruction(workspaceId, {
        name,
        content,
      });

      return res.status(201).json(instruction);
    } catch (err: any) {
      return res.status(err.status || 500).json({ error: err.message });
    }
  };

  // ----------------------------------------
  // GET /instructions/:instructionId
  // ----------------------------------------
  getById = async (req: Request, res: Response) => {
    try {
      const { instructionId } = req.params;
      const instruction = await this.service.getInstruction(instructionId);
      return res.status(200).json(instruction);
    } catch (err: any) {
      return res.status(err.status || 500).json({ error: err.message });
    }
  };

  // ----------------------------------------
  // GET /workspaces/:workspaceId/instructions
  // ----------------------------------------
  listByWorkspace = async (req: Request, res: Response) => {
    try {
      const { workspaceId } = req.params;
      const list = await this.service.listInstructions(workspaceId);
      return res.status(200).json(list);
    } catch (err: any) {
      return res.status(err.status || 500).json({ error: err.message });
    }
  };

  // ----------------------------------------
  // PATCH /instructions/:instructionId
  // ----------------------------------------
  update = async (req: Request, res: Response) => {
    try {
      const { instructionId } = req.params;
      const { name, content } = req.body;

      const updated = await this.service.updateInstruction(instructionId, {
        name,
        content,
      });

      return res.status(200).json(updated);
    } catch (err: any) {
      return res.status(err.status || 500).json({ error: err.message });
    }
  };

  // ----------------------------------------
  // DELETE /instructions/:instructionId
  // ----------------------------------------
  delete = async (req: Request, res: Response) => {
    try {
      const { instructionId } = req.params;
      await this.service.deleteInstruction(instructionId);
      return res.status(200).json({ success: true });
    } catch (err: any) {
      return res.status(err.status || 500).json({ error: err.message });
    }
  };

  // ----------------------------------------
  // POST /instructions/:instructionId/refine
  // ----------------------------------------
  refine = async (req: Request, res: Response) => {
    try {
      const { instructionId } = req.params;
      const refined = await this.service.refineInstruction(instructionId);
      return res.status(200).json(refined);
    } catch (err: any) {
      return res.status(err.status || 500).json({ error: err.message });
    }
  };

  // ----------------------------------------
  // POST /assistants/:assistantId/instructions/:instructionId
  // ----------------------------------------
  linkToAssistant = async (req: Request, res: Response) => {
    try {
      const { assistantId, instructionId } = req.params;

      await this.service.linkToAssistant(assistantId, instructionId);

      return res.status(200).json({ success: true });
    } catch (err: any) {
      return res.status(err.status || 500).json({ error: err.message });
    }
  };
}
