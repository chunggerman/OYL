"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const WorkflowStepService_1 = require("../services/WorkflowStepService");
const PostgresWorkflowStepRepository_1 = require("../domain/repositories/PostgresWorkflowStepRepository");
const router = express_1.default.Router();
const service = new WorkflowStepService_1.WorkflowStepService(new PostgresWorkflowStepRepository_1.PostgresWorkflowStepRepository());
router.get("/:id", async (req, res, next) => {
    try {
        const step = await service.getStep(req.params.id);
        if (!step)
            return res.status(404).json({ message: "Not found" });
        res.json(step);
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
