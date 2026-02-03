"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationConfigService = void 0;
class IntegrationConfigService {
    constructor(repo) {
        this.repo = repo;
    }
    async getConfig(id) {
        return this.repo.findById(id);
    }
    async getByWorkspace(workspaceId) {
        return this.repo.findByWorkspace(workspaceId);
    }
    async createConfig(config) {
        await this.repo.create(config);
    }
}
exports.IntegrationConfigService = IntegrationConfigService;
