"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagLinkService = void 0;
class TagLinkService {
    constructor(repo) {
        this.repo = repo;
    }
    async getTagLink(id) {
        return this.repo.findById(id);
    }
    async getByChunk(chunkId) {
        return this.repo.findByChunk(chunkId);
    }
    async createTagLink(tagLink) {
        await this.repo.create(tagLink);
    }
}
exports.TagLinkService = TagLinkService;
