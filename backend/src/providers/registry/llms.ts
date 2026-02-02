import qwen from "../llms/qwen2.5-14b";
import llama from "../llms/llama3.1-8b";
import deepseekOcrLlm from "../llms/deepseek-ocr-llm";

export const llmProviders = [
  qwen,
  llama,
  deepseekOcrLlm
];

export type LlmProvider = (typeof llmProviders)[number];
