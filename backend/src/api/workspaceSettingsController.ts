import { Request, Response } from "express";
import { WorkspaceSettingsService } from "../services/WorkspaceSettingsService";

const service = new WorkspaceSettingsService();

export const getWorkspaceSettings = async (req: Request, res: Response) => {
  const workspaceId = Number(req.params.workspaceId);
  const settings = await service.getAll(workspaceId);
  res.json(settings);
};

export const getWorkspaceSetting = async (req: Request, res: Response) => {
  const workspaceId = Number(req.params.workspaceId);
  const key = req.params.key;
  const setting = await service.get(workspaceId, key);
  res.json(setting);
};

export const setWorkspaceSetting = async (req: Request, res: Response) => {
  const workspaceId = Number(req.params.workspaceId);
  const key = req.params.key;
  const value = req.body.value;
  const result = await service.set(workspaceId, key, value);
  res.json(result);
};
