"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddingService = void 0;
class EmbeddingService {
    constructor(repo) {
        this.repo = repo;
    }
    async getEmbedding(id) {
        return this.repo.findById(id);
    }
    async getByChunk(chunkId) {
        return this.repo.findByChunk(chunkId);
    }
    async createEmbedding(embedding) {
        await this.repo.create(embedding);
    }
}
exports.EmbeddingService = EmbeddingService;
