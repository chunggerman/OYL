import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  list = async (req: Request, res: Response) => {
    const tenantId = req.headers["x-tenant-id"] as string;
    const users = await this.service.list(tenantId);
    res.json(users);
  };

  get = async (req: Request, res: Response) => {
    const { id } = req.params;
    const tenantId = req.headers["x-tenant-id"] as string;
    const user = await this.service.get(id, tenantId);
    res.json(user);
  };

  create = async (req: Request, res: Response) => {
    const { email, name } = req.body;
    const tenantId = req.headers["x-tenant-id"] as string;
    const user = await this.service.create(email, name, tenantId);
    res.status(201).json(user);
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, name } = req.body;
    const tenantId = req.headers["x-tenant-id"] as string;
    const user = await this.service.update(id, email, name, tenantId);
    res.json(user);
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const tenantId = req.headers["x-tenant-id"] as string;
    await this.service.delete(id, tenantId);
    res.status(204).send();
  };
}
