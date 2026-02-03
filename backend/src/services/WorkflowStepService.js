"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowStepService = void 0;
class WorkflowStepService {
    constructor(repo) {
        this.repo = repo;
    }
    async getStep(id) {
        return this.repo.findById(id);
    }
    async getByWorkflow(workflowId) {
        return this.repo.findByWorkflow(workflowId);
    }
    async createStep(step) {
        await this.repo.create(step);
    }
}
exports.WorkflowStepService = WorkflowStepService;
