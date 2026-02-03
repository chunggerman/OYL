"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const createTag_1 = require("../../tags/manual/createTag");
const listTags_1 = require("../../tags/manual/listTags");
const router = express_1.default.Router();
const db = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
router.post("/", async (req, res) => {
    const { workspaceId, name } = req.body;
    const tag = await (0, createTag_1.createTag)(db, workspaceId, name);
    res.json(tag);
});
router.get("/:workspaceId", async (req, res) => {
    const tags = await (0, listTags_1.listTags)(db, req.params.workspaceId);
    res.json(tags);
});
exports.default = router;
