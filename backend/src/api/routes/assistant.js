"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const runAssistant_1 = require("../../assistant/runAssistant");
const router = express_1.default.Router();
const db = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
router.post("/:assistantId", async (req, res) => {
    const { assistantId } = req.params;
    const { message } = req.body;
    const result = await (0, runAssistant_1.runAssistant)(db, assistantId, message);
    res.json(result);
});
exports.default = router;
