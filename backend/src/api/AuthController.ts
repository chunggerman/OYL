import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
  private service: AuthService;

  constructor() {
    this.service = new AuthService();
  }

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const result = await this.service.login(email, password);

    if (!result) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json(result);
  };

  register = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    const user = await this.service.register(email, password, name);
    res.status(201).json(user);
  };

  me = async (req: Request, res: Response) => {
    const user = await this.service.me(req);

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    res.json(user);
  };
}
