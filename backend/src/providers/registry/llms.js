"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.llmProviders = void 0;
const qwen2_5_14b_1 = __importDefault(require("../llms/qwen2.5-14b"));
const llama3_1_8b_1 = __importDefault(require("../llms/llama3.1-8b"));
const deepseek_ocr_llm_1 = __importDefault(require("../llms/deepseek-ocr-llm"));
exports.llmProviders = [
    qwen2_5_14b_1.default,
    llama3_1_8b_1.default,
    deepseek_ocr_llm_1.default
];
