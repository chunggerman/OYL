"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const WorkflowService_1 = require("../services/WorkflowService");
const PostgresWorkflowRepository_1 = require("../domain/repositories/PostgresWorkflowRepository");
const router = express_1.default.Router();
const service = new WorkflowService_1.WorkflowService(new PostgresWorkflowRepository_1.PostgresWorkflowRepository());
router.get("/:id", async (req, res, next) => {
    try {
        const workflow = await service.getWorkflow(req.params.id);
        if (!workflow)
            return res.status(404).json({ message: "Not found" });
        res.json(workflow);
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
