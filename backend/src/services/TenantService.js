"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantService = void 0;
class TenantService {
    constructor(repo) {
        this.repo = repo;
    }
    async getTenant(id) {
        return this.repo.findById(id);
    }
    async getMany(ids) {
        return this.repo.findManyByIds(ids);
    }
    async createTenant(tenant) {
        await this.repo.create(tenant);
    }
}
exports.TenantService = TenantService;
