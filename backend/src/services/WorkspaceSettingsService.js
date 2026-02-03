"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceSettingsService = void 0;
const WorkspaceSettingsRepository_1 = require("../domain/repositories/WorkspaceSettingsRepository");
class WorkspaceSettingsService {
    constructor() {
        this.repo = new WorkspaceSettingsRepository_1.WorkspaceSettingsRepository();
    }
    async getAll(workspaceId) {
        return this.repo.getSettings(workspaceId);
    }
    async get(workspaceId, key) {
        return this.repo.getSetting(workspaceId, key);
    }
    async set(workspaceId, key, value) {
        await this.repo.upsertSetting(workspaceId, key, value);
        return { success: true };
    }
}
exports.WorkspaceSettingsService = WorkspaceSettingsService;
