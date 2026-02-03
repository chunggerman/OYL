import { Request, Response, NextFunction } from "express";

export function tenantMiddleware(req: Request, res: Response, next: NextFunction) {
  const workspaceId = req.headers["x-workspace-id"];

  if (!workspaceId) {
    return res.status(400).json({ error: "Missing workspace ID" });
  }

  req.workspaceId = String(workspaceId);
  next();
}
