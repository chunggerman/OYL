"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setWorkspaceSetting = exports.getWorkspaceSetting = exports.getWorkspaceSettings = void 0;
const WorkspaceSettingsService_1 = require("../services/WorkspaceSettingsService");
const service = new WorkspaceSettingsService_1.WorkspaceSettingsService();
const getWorkspaceSettings = async (req, res) => {
    const workspaceId = Number(req.params.workspaceId);
    const settings = await service.getAll(workspaceId);
    res.json(settings);
};
exports.getWorkspaceSettings = getWorkspaceSettings;
const getWorkspaceSetting = async (req, res) => {
    const workspaceId = Number(req.params.workspaceId);
    const key = req.params.key;
    const setting = await service.get(workspaceId, key);
    res.json(setting);
};
exports.getWorkspaceSetting = getWorkspaceSetting;
const setWorkspaceSetting = async (req, res) => {
    const workspaceId = Number(req.params.workspaceId);
    const key = req.params.key;
    const value = req.body.value;
    const result = await service.set(workspaceId, key, value);
    res.json(result);
};
exports.setWorkspaceSetting = setWorkspaceSetting;
