import { Router } from "express";
import { TenantsController } from "../TenantsController";

const router = Router();
const controller = new TenantsController();

router.post("/tenants", controller.createTenant);
router.get("/tenants", controller.getAllTenants);
router.get("/tenants/:id", controller.getTenantById);
router.put("/tenants/:id", controller.updateTenant);
router.delete("/tenants/:id", controller.deleteTenant);

export default router;
