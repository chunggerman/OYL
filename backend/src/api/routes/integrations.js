"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const registerIntegration_1 = require("../../integrations/registerIntegration");
const runIntegration_1 = require("../../integrations/runIntegration");
const router = express_1.default.Router();
const db = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
router.post("/", async (req, res) => {
    const { workspaceId, type, config } = req.body;
    const integration = await (0, registerIntegration_1.registerIntegration)(db, workspaceId, type, config);
    res.json(integration);
});
router.post("/:integrationId/run", async (req, res) => {
    const { integrationId } = req.params;
    const result = await (0, runIntegration_1.runIntegration)(db, integrationId);
    res.json(result);
});
exports.default = router;
