"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const semanticTagsController_1 = require("../semanticTagsController");
const router = (0, express_1.Router)();
router.get("/:chunkId", semanticTagsController_1.getSemanticTagsByChunk);
router.get("/search/by-tag/:tag", semanticTagsController_1.searchSemanticTags);
exports.default = router;
