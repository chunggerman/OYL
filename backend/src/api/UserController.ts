import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  list = async (_req: Request, res: Response) => {
    const users = await this.service.list();
    res.json(users);
  };

  get = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await this.service.get(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  };

  create = async (req: Request, res: Response) => {
    const { email, name } = req.body;

    const user = await this.service.create(email, name);
    res.status(201).json(user);
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, name } = req.body;

    const user = await this.service.update(id, email, name);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    await this.service.delete(id);
    res.status(204).send();
  };
}
