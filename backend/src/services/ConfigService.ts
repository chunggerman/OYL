import {
  Config,
  CreateConfigInput,
  UpdateConfigInput,
} from "../domain/entities/Config";
import { ConfigRepository } from "../domain/repositories/ConfigRepository";

export class ConfigService {
  constructor(private readonly repo: ConfigRepository) {}

  listByWorkspace(workspaceId: string): Promise<Config[]> {
    return this.repo.listByWorkspace(workspaceId);
  }

  create(input: CreateConfigInput): Promise<Config> {
    return this.repo.create(input);
  }

  get(id: string): Promise<Config | null> {
    return this.repo.getById(id);
  }

  update(id: string, input: UpdateConfigInput): Promise<Config | null> {
    return this.repo.update(id, input);
  }

  delete(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}
