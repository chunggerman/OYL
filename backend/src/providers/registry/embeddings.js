"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.embeddingProviders = void 0;
const deepseek_ocr_1 = __importDefault(require("../embeddings/deepseek-ocr"));
const nomic_embed_text_1 = __importDefault(require("../embeddings/nomic-embed-text"));
const mxbai_embed_large_1 = __importDefault(require("../embeddings/mxbai-embed-large"));
exports.embeddingProviders = [
    deepseek_ocr_1.default,
    nomic_embed_text_1.default,
    mxbai_embed_large_1.default
];
