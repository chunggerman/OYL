"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssistantService = void 0;
class AssistantService {
    constructor(repo) {
        this.repo = repo;
    }
    async getAssistant(id) {
        return this.repo.findById(id);
    }
    async getByWorkspace(workspaceId) {
        return this.repo.findByWorkspace(workspaceId);
    }
    async createAssistant(assistant) {
        await this.repo.create(assistant);
    }
}
exports.AssistantService = AssistantService;
