import { PostgresApiKeyRepository } from "../repositories/PostgresApiKeyRepository";

export class ApiKeyService {
  private repo: PostgresApiKeyRepository;

  constructor() {
    this.repo = new PostgresApiKeyRepository();
  }

  async list(workspaceId: string) {
    return this.repo.listByWorkspace(workspaceId);
  }

  async get(id: string, workspaceId: string) {
    return this.repo.getById(id, workspaceId);
  }

  async getByKey(apiKey: string, workspaceId: string) {
    return this.repo.getByKey(apiKey, workspaceId);
  }

  async create(
    workspaceId: string,
    name: string,
    key: string
  ) {
    return this.repo.create(workspaceId, name, key);
  }

  async delete(id: string, workspaceId: string) {
    await this.repo.delete(id, workspaceId);
  }
}
