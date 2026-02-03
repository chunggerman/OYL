import { Request, Response } from "express";
import { LLMService } from "../services/LLMService";

export class LLMController {
  private service: LLMService;

  constructor() {
    this.service = new LLMService();
  }

  generate = async (req: Request, res: Response) => {
    const { workspaceId } = req.params;
    const { threadId, message } = req.body;

    const result = await this.service.generate(workspaceId, threadId, message);
    res.json(result);
  };
}
