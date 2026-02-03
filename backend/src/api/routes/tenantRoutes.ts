import { Router } from "express";
import { TenantsController } from "../tenantsController";

const router = Router();
const controller = new TenantsController();

router.get("/tenants", (req, res) => controller.listTenants(req, res));
router.get("/tenants/:id", (req, res) => controller.getTenant(req, res));
router.post("/tenants", (req, res) => controller.createTenant(req, res));
router.delete("/tenants/:id", (req, res) => controller.deleteTenant(req, res));

export default router;
