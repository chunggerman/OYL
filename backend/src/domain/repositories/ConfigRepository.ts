import {
  Config,
  CreateConfigInput,
  UpdateConfigInput,
} from "../entities/Config";

export interface ConfigRepository {
  listByWorkspace(workspaceId: string): Promise<Config[]>;
  create(input: CreateConfigInput): Promise<Config>;
  getById(id: string): Promise<Config | null>;
  update(id: string, input: UpdateConfigInput): Promise<Config | null>;
  delete(id: string): Promise<void>;
}
