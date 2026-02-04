import { Request, Response } from "express";
import { TenantService } from "../services/TenantService";

export class TenantsController {
  private service: TenantService;

  constructor() {
    this.service = new TenantService();
  }

  createTenant = async (req: Request, res: Response) => {
    const { name, metadataEncrypted } = req.body;
    const tenant = await this.service.createTenant(name, metadataEncrypted || null);
    res.status(201).json(tenant);
  };

  getAllTenants = async (_req: Request, res: Response) => {
    const tenants = await this.service.getAllTenants();
    res.json(tenants);
  };

  getTenantById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const tenant = await this.service.getTenantById(id);
    res.json(tenant);
  };

  updateTenant = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    const tenant = await this.service.updateTenant(id, name);
    res.json(tenant);
  };

  deleteTenant = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.service.deleteTenant(id);
    res.status(204).send();
  };
}
