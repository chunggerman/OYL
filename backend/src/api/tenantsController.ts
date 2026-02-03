import { Request, Response } from "express";
import { TenantService } from "../services/TenantService";

export class TenantController {
  private service: TenantService;

  constructor() {
    this.service = new TenantService();
  }

  list = async (_req: Request, res: Response) => {
    const tenants = await this.service.list();
    res.json(tenants);
  };

  get = async (req: Request, res: Response) => {
    const { id } = req.params;
    const tenant = await this.service.get(id);

    if (!tenant) {
      return res.status(404).json({ error: "Tenant not found" });
    }

    res.json(tenant);
  };

  create = async (req: Request, res: Response) => {
    const { name } = req.body;

    const tenant = await this.service.create(name);
    res.status(201).json(tenant);
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    const tenant = await this.service.update(id, name);

    if (!tenant) {
      return res.status(404).json({ error: "Tenant not found" });
    }

    res.json(tenant);
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    await this.service.delete(id);
    res.status(204).send();
  };
}
