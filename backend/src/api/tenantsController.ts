import express from "express";
import { TenantService } from "../services/TenantService";
import { PostgresTenantRepository } from "../domain/repositories/PostgresTenantRepository";

const router = express.Router();
const service = new TenantService(new PostgresTenantRepository());

router.get("/:id", async (req, res, next) => {
  try {
    const tenant = await service.getTenant(req.params.id);
    if (!tenant) return res.status(404).json({ message: "Not found" });
    res.json(tenant);
  } catch (err) {
    next(err);
  }
});

export default router;
