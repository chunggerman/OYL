"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogService = void 0;
class AuditLogService {
    constructor(repo) {
        this.repo = repo;
    }
    async getLog(id) {
        return this.repo.findById(id);
    }
    async getByWorkspace(workspaceId) {
        return this.repo.findByWorkspace(workspaceId);
    }
    async createLog(log) {
        await this.repo.create(log);
    }
}
exports.AuditLogService = AuditLogService;
