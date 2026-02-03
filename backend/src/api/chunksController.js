"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ChunkService_1 = require("../services/ChunkService");
const PostgresChunkRepository_1 = require("../domain/repositories/PostgresChunkRepository");
const router = express_1.default.Router();
const service = new ChunkService_1.ChunkService(new PostgresChunkRepository_1.PostgresChunkRepository());
router.get("/:id", async (req, res, next) => {
    try {
        const chunk = await service.getChunk(req.params.id);
        if (!chunk)
            return res.status(404).json({ message: "Not found" });
        res.json(chunk);
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
