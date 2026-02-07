import { TenantRepository } from "../domain/repositories/TenantRepository";
import {
  CreateTenantInput,
  UpdateTenantInput,
} from "../domain/entities/Tenant";

export class TenantService {
  constructor(private repo: TenantRepository) {}

  listByUser(ownerId: string) {
    return this.repo.listByUser(ownerId);
  }

  create(input: CreateTenantInput) {
    return this.repo.create(input);
  }

  getById(id: string) {
    return this.repo.getById(id);
  }

  update(id: string, input: UpdateTenantInput) {
    return this.repo.update(id, input);
  }

  delete(id: string) {
    return this.repo.delete(id);
  }
}
