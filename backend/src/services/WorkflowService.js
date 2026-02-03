"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowService = void 0;
class WorkflowService {
    constructor(repo) {
        this.repo = repo;
    }
    async getWorkflow(id) {
        return this.repo.findById(id);
    }
    async getByWorkspace(workspaceId) {
        return this.repo.findByWorkspace(workspaceId);
    }
    async createWorkflow(workflow) {
        await this.repo.create(workflow);
    }
}
exports.WorkflowService = WorkflowService;
