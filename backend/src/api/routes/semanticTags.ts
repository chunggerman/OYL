import { Router } from "express";
import {
  getSemanticTagsByChunk,
  searchSemanticTags,
} from "../semanticTagsController";

const router = Router();

router.get("/:chunkId", getSemanticTagsByChunk);
router.get("/search/by-tag/:tag", searchSemanticTags);

export default router;
