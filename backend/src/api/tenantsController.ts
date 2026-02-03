import { Request, Response } from "express";
import { TenantService } from "../services/TenantService";

const tenantService = new TenantService();

export class TenantsController {
  async listTenants(req: Request, res: Response): Promise<void> {
    const tenants = await tenantService.listTenants();
    res.json(tenants);
  }

  async getTenant(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const tenant = await tenantService.getTenantById(id);
    if (!tenant) {
      res.status(404).json({ error: "Tenant not found" });
      return;
    }
    res.json(tenant);
  }

  async createTenant(req: Request, res: Response): Promise<void> {
    const { name, metadataEncrypted } = req.body;
    if (!name) {
      res.status(400).json({ error: "name is required" });
      return;
    }

    const tenant = await tenantService.createTenant(
      name,
      metadataEncrypted ?? null
    );
    res.status(201).json(tenant);
  }

  async deleteTenant(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await tenantService.deleteTenant(id);
    res.status(204).send();
  }
}
