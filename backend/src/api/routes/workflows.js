"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const createWorkflow_1 = require("../../workflows/createWorkflow");
const addStep_1 = require("../../workflows/addStep");
const executeWorkflow_1 = require("../../workflows/executeWorkflow");
const router = express_1.default.Router();
const db = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
router.post("/", async (req, res) => {
    const { workspaceId, name } = req.body;
    const wf = await (0, createWorkflow_1.createWorkflow)(db, workspaceId, name);
    res.json(wf);
});
router.post("/:workflowId/steps", async (req, res) => {
    const { workflowId } = req.params;
    const { stepType, config, order } = req.body;
    const step = await (0, addStep_1.addStep)(db, workflowId, stepType, config, order);
    res.json(step);
});
router.post("/:workflowId/execute", async (req, res) => {
    const { workflowId } = req.params;
    const result = await (0, executeWorkflow_1.executeWorkflow)(db, workflowId);
    res.json(result);
});
exports.default = router;
