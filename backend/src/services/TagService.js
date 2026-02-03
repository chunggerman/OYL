"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagService = void 0;
class TagService {
    constructor(repo) {
        this.repo = repo;
    }
    async getTag(id) {
        return this.repo.findById(id);
    }
    async getByReference(referenceId) {
        return this.repo.findByReference(referenceId);
    }
    async createTag(tag) {
        await this.repo.create(tag);
    }
}
exports.TagService = TagService;
