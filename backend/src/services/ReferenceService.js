"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceService = void 0;
class ReferenceService {
    constructor(repo) {
        this.repo = repo;
    }
    async getReference(id) {
        return this.repo.findById(id);
    }
    async getByWorkspace(workspaceId) {
        return this.repo.findByWorkspace(workspaceId);
    }
    async createReference(reference) {
        await this.repo.create(reference);
    }
}
exports.ReferenceService = ReferenceService;
