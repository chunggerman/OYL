"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChunkService = void 0;
class ChunkService {
    constructor(repo) {
        this.repo = repo;
    }
    async getChunk(id) {
        return this.repo.findById(id);
    }
    async getByDocument(documentId) {
        return this.repo.findByDocument(documentId);
    }
    async createChunk(chunk) {
        await this.repo.create(chunk);
    }
}
exports.ChunkService = ChunkService;
