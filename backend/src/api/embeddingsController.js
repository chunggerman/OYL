"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const EmbeddingService_1 = require("../services/EmbeddingService");
const PostgresEmbeddingRepository_1 = require("../domain/repositories/PostgresEmbeddingRepository");
const router = express_1.default.Router();
const service = new EmbeddingService_1.EmbeddingService(new PostgresEmbeddingRepository_1.PostgresEmbeddingRepository());
router.get("/:id", async (req, res, next) => {
    try {
        const embedding = await service.getEmbedding(req.params.id);
        if (!embedding)
            return res.status(404).json({ message: "Not found" });
        res.json(embedding);
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
