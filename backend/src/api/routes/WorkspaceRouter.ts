import { Router, Request, Response, NextFunction } from "express";
import WorkspaceController from "../WorkspaceController";
import { WorkspaceService } from "../../services/WorkspaceService";
import { PostgresWorkspaceRepository } from "../../domain/repositories/PostgresWorkspaceRepository";

const router = Router();

const repo = new PostgresWorkspaceRepository();
const service = new WorkspaceService(repo);
const controller = new WorkspaceController(service);

// tenant boundary middleware
const workspaceTenantIsolation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headerTenantId = req.header("X-Tenant-ID");
  const workspaceId = req.params.id;

  if (!headerTenantId) {
    return res.status(403).json({ error: "Forbidden" });
  }

  try {
    const workspace = await repo.getById(workspaceId);

    // TEN‑010: missing workspace must return 403, not 404
    if (!workspace) {
      return res.status(403).json({ error: "Forbidden" });
    }

    if (workspace.ownerId !== headerTenantId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  } catch {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// IMPORTANT: define GET /:id FIRST and EXCLUSIVELY
router.get("/:id", workspaceTenantIsolation, controller.getById);

// Other workspace routes
router.post("/", controller.create);
router.patch("/:id", workspaceTenantIsolation, controller.update);
router.delete("/:id", workspaceTenantIsolation, controller.delete);

export default router;
