import { PostgresAssistantRepository } from "../repositories/PostgresAssistantRepository";

export class AssistantService {
  private repo: PostgresAssistantRepository;

  constructor() {
    this.repo = new PostgresAssistantRepository();
  }

  async list(workspaceId: string) {
    return this.repo.listByWorkspace(workspaceId);
  }

  async get(id: string, workspaceId: string) {
    return this.repo.getById(id, workspaceId);
  }

  async create(
    workspaceId: string,
    name: string,
    description: string | null
  ) {
    return this.repo.create(workspaceId, name, description);
  }

  async update(
    id: string,
    workspaceId: string,
    name: string,
    description: string | null
  ) {
    return this.repo.update(id, workspaceId, name, description);
  }

  async delete(id: string, workspaceId: string) {
    await this.repo.delete(id, workspaceId);
  }
}
