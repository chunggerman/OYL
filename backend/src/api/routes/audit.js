"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const listAuditLogs_1 = require("../../audit/listAuditLogs");
const router = express_1.default.Router();
const db = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
router.get("/:workspaceId", async (req, res) => {
    const logs = await (0, listAuditLogs_1.listAuditLogs)(db, req.params.workspaceId);
    res.json(logs);
});
exports.default = router;
