"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceService = void 0;
class WorkspaceService {
    constructor(repo) {
        this.repo = repo;
    }
    async getWorkspace(id) {
        return this.repo.findById(id);
    }
    async getByTenant(tenantId) {
        return this.repo.findByTenant(tenantId);
    }
    async createWorkspace(workspace) {
        await this.repo.create(workspace);
    }
}
exports.WorkspaceService = WorkspaceService;
