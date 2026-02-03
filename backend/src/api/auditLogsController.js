"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuditLogService_1 = require("../services/AuditLogService");
const PostgresAuditLogRepository_1 = require("../domain/repositories/PostgresAuditLogRepository");
const router = express_1.default.Router();
const service = new AuditLogService_1.AuditLogService(new PostgresAuditLogRepository_1.PostgresAuditLogRepository());
router.get("/:id", async (req, res, next) => {
    try {
        const log = await service.getLog(req.params.id);
        if (!log)
            return res.status(404).json({ message: "Not found" });
        res.json(log);
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
