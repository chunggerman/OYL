"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ReferenceService_1 = require("../services/ReferenceService");
const PostgresReferenceRepository_1 = require("../domain/repositories/PostgresReferenceRepository");
const router = express_1.default.Router();
const service = new ReferenceService_1.ReferenceService(new PostgresReferenceRepository_1.PostgresReferenceRepository());
router.get("/:id", async (req, res, next) => {
    try {
        const reference = await service.getReference(req.params.id);
        if (!reference)
            return res.status(404).json({ message: "Not found" });
        res.json(reference);
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
