import { Router, Request, Response, NextFunction } from "express";
import { TenantController } from "../TenantController";
import { TenantService } from "../../services/TenantService";
import { PostgresTenantRepository } from "../../domain/repositories/PostgresTenantRepository";

const router = Router();

const repo = new PostgresTenantRepository();
const service = new TenantService(repo);
const controller = new TenantController(service);

// tenant isolation middleware
const tenantIsolation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headerTenantId = req.header("X-Tenant-ID");
  const targetTenantId = req.params.id;

  if (headerTenantId && headerTenantId !== targetTenantId) {
    return res.status(403).json({ error: "Forbidden" });
  }

  next();
};

// IMPORTANT: remove /tenants prefix here
router.post("/", controller.create);
router.get("/:id", tenantIsolation, controller.getById);
router.get("/user/:ownerId", controller.listByUser);
router.patch("/:id", tenantIsolation, controller.update);
router.delete("/:id", tenantIsolation, controller.delete);

export default router;
