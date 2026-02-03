"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentService = void 0;
class DocumentService {
    constructor(repo) {
        this.repo = repo;
    }
    async getDocument(id) {
        return this.repo.findById(id);
    }
    async getByReference(referenceId) {
        return this.repo.findByReference(referenceId);
    }
    async createDocument(doc) {
        await this.repo.create(doc);
    }
}
exports.DocumentService = DocumentService;
