"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const IntegrationConfigService_1 = require("../services/IntegrationConfigService");
const PostgresIntegrationConfigRepository_1 = require("../domain/repositories/PostgresIntegrationConfigRepository");
const router = express_1.default.Router();
const service = new IntegrationConfigService_1.IntegrationConfigService(new PostgresIntegrationConfigRepository_1.PostgresIntegrationConfigRepository());
router.get("/:id", async (req, res, next) => {
    try {
        const config = await service.getConfig(req.params.id);
        if (!config)
            return res.status(404).json({ message: "Not found" });
        res.json(config);
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
