"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSourceService = void 0;
class DataSourceService {
    constructor(repo) {
        this.repo = repo;
    }
    async getDataSource(id) {
        return this.repo.findById(id);
    }
    async getByWorkspace(workspaceId) {
        return this.repo.findByWorkspace(workspaceId);
    }
    async createDataSource(dataSource) {
        await this.repo.create(dataSource);
    }
}
exports.DataSourceService = DataSourceService;
