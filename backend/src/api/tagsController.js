"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TagService_1 = require("../services/TagService");
const PostgresTagRepository_1 = require("../domain/repositories/PostgresTagRepository");
const router = express_1.default.Router();
const service = new TagService_1.TagService(new PostgresTagRepository_1.PostgresTagRepository());
router.get("/:id", async (req, res, next) => {
    try {
        const tag = await service.getTag(req.params.id);
        if (!tag)
            return res.status(404).json({ message: "Not found" });
        res.json(tag);
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
