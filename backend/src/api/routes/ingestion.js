"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const ingestDocument_1 = require("../../ingestion/ingestDocument");
const router = express_1.default.Router();
const db = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
router.post("/", async (req, res) => {
    const { workspaceId, title, content } = req.body;
    const result = await (0, ingestDocument_1.ingestDocument)(db, workspaceId, title, content);
    res.json(result);
});
exports.default = router;
