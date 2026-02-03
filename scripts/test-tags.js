"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pg_1 = require("pg");
const createTag_1 = require("../backend/src/tags/createTag");
const linkTag_1 = require("../backend/src/tags/linkTag");
const listTags_1 = require("../backend/src/tags/listTags");
const listTaggedDocuments_1 = require("../backend/src/tags/listTaggedDocuments");
const db = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL
});
async function run() {
    const workspaceId = process.argv[2];
    const documentId = process.argv[3];
    if (!workspaceId || !documentId) {
        console.error("Usage: npm run tags <workspaceId> <documentId>");
        process.exit(1);
    }
    const tag = await (0, createTag_1.createTag)(db, workspaceId, "Demo Tag");
    console.log("Created tag:", tag);
    await (0, linkTag_1.linkTagToDocument)(db, tag.id, documentId);
    console.log("Linked tag to document");
    const tags = await (0, listTags_1.listTags)(db, workspaceId);
    console.log("All tags:", tags);
    const docs = await (0, listTaggedDocuments_1.listTaggedDocuments)(db, tag.id);
    console.log("Documents with this tag:", docs);
    await db.end();
}
run();
