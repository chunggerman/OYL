"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TagLinkService_1 = require("../services/TagLinkService");
const PostgresTagLinkRepository_1 = require("../domain/repositories/PostgresTagLinkRepository");
const router = express_1.default.Router();
const service = new TagLinkService_1.TagLinkService(new PostgresTagLinkRepository_1.PostgresTagLinkRepository());
router.get("/:id", async (req, res, next) => {
    try {
        const tagLink = await service.getTagLink(req.params.id);
        if (!tagLink)
            return res.status(404).json({ message: "Not found" });
        res.json(tagLink);
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
