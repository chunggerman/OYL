import { WorkspaceSettingsRepository } from "../domain/repositories/WorkspaceSettingsRepository";

export class WorkspaceSettingsService {
  private repo = new WorkspaceSettingsRepository();

  async getAll(workspaceId: number) {
    return this.repo.getSettings(workspaceId);
  }

  async get(workspaceId: number, key: string) {
    return this.repo.getSetting(workspaceId, key);
  }

  async set(workspaceId: number, key: string, value: any) {
    await this.repo.upsertSetting(workspaceId, key, value);
    return { success: true };
  }
}
