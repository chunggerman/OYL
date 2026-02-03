"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DocumentService_1 = require("../services/DocumentService");
const PostgresDocumentRepository_1 = require("../domain/repositories/PostgresDocumentRepository");
const router = express_1.default.Router();
const service = new DocumentService_1.DocumentService(new PostgresDocumentRepository_1.PostgresDocumentRepository());
router.get("/:id", async (req, res, next) => {
    try {
        const doc = await service.getDocument(req.params.id);
        if (!doc)
            return res.status(404).json({ message: "Not found" });
        res.json(doc);
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
