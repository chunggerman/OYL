import { Request, Response } from "express";
import { TenantService } from "../services/TenantService";
import { z } from "zod";

const createTenantSchema = z.object({
  name: z.string().min(1, "Name is required"),
  metadata: z.any().optional(),
  ownerId: z.string().uuid("ownerId must be a valid UUID"),
});

const updateTenantSchema = z.object({
  name: z.string().optional(),
  metadata: z.any().optional(),
});

export class TenantController {
  constructor(private service: TenantService) {}

  create = async (req: Request, res: Response) => {
    try {
      const parsed = createTenantSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          errors: parsed.error.issues.map(issue => ({
            code: issue.code,
            message: issue.message,
            path: issue.path
          }))
        });
      }

      const input = parsed.data;

      const metadataSize = Buffer.byteLength(
        JSON.stringify(input.metadata || {}),
        "utf8"
      );
      if (metadataSize > 10_000) {
        return res.status(400).json({
          error: "Metadata too large (max 10KB)"
        });
      }

      const tenant = await this.service.create(input);
      return res.status(201).json(tenant);
    } catch {
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  listByUser = async (req: Request, res: Response) => {
    try {
      const ownerId = req.params.ownerId;
      const tenants = await this.service.listByUser(ownerId);
      return res.json(tenants);
    } catch {
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const tenant = await this.service.getById(req.params.id);
      if (!tenant) return res.status(404).json({ error: "Not found" });
      return res.json(tenant);
    } catch {
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const parsed = updateTenantSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          errors: parsed.error.issues.map(issue => ({
            code: issue.code,
            message: issue.message,
            path: issue.path
          }))
        });
      }

      const input = parsed.data;

      if (input.metadata !== undefined) {
        const metadataSize = Buffer.byteLength(
          JSON.stringify(input.metadata),
          "utf8"
        );
        if (metadataSize > 10_000) {
          return res.status(400).json({
            error: "Metadata too large (max 10KB)"
          });
        }
      }

      const tenant = await this.service.update(req.params.id, input);
      if (!tenant) return res.status(404).json({ error: "Not found" });
      return res.json(tenant);
    } catch {
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      await this.service.delete(req.params.id);
      return res.status(200).json({ deleted: true });
    } catch {
      return res.status(500).json({ error: "Internal server error" });
    }
  };
}
