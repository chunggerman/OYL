"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AssistantService_1 = require("../services/AssistantService");
const PostgresAssistantRepository_1 = require("../domain/repositories/PostgresAssistantRepository");
const router = express_1.default.Router();
const service = new AssistantService_1.AssistantService(new PostgresAssistantRepository_1.PostgresAssistantRepository());
router.get("/:id", async (req, res, next) => {
    try {
        const assistant = await service.getAssistant(req.params.id);
        if (!assistant)
            return res.status(404).json({ message: "Not found" });
        res.json(assistant);
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
