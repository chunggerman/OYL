"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const WorkspaceService_1 = require("../services/WorkspaceService");
const PostgresWorkspaceRepository_1 = require("../domain/repositories/PostgresWorkspaceRepository");
const router = express_1.default.Router();
const service = new WorkspaceService_1.WorkspaceService(new PostgresWorkspaceRepository_1.PostgresWorkspaceRepository());
router.get("/:id", async (req, res, next) => {
    try {
        const workspace = await service.getWorkspace(req.params.id);
        if (!workspace)
            return res.status(404).json({ message: "Not found" });
        res.json(workspace);
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
