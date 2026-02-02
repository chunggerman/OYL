import deepseek from "../embeddings/deepseek-ocr";
import nomic from "../embeddings/nomic-embed-text";
import mxbai from "../embeddings/mxbai-embed-large";

export const embeddingProviders = [
  deepseek,
  nomic,
  mxbai
];

export type EmbeddingProvider = (typeof embeddingProviders)[number];
