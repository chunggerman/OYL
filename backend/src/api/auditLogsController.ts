import express from "express";
import { AuditLogService } from "../services/AuditLogService";
import { PostgresAuditLogRepository } from "../domain/repositories/PostgresAuditLogRepository";

const router = express.Router();
const service = new AuditLogService(new PostgresAuditLogRepository());

router.get("/:id", async (req, res, next) => {
  try {
    const log = await service.getLog(req.params.id);
    if (!log) return res.status(404).json({ message: "Not found" });
    res.json(log);
  } catch (err) {
    next(err);
  }
});

export default router;
