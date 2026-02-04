import {
  Tenant,
  CreateTenantInput,
  UpdateTenantInput,
} from "../domain/entities/Tenant";
import { TenantRepository } from "../domain/repositories/TenantRepository";

export class TenantService {
  constructor(private readonly repo: TenantRepository) {}

  listByOwner(ownerId: string): Promise<Tenant[]> {
    return this.repo.listByOwner(ownerId);
  }

  create(input: CreateTenantInput): Promise<Tenant> {
    return this.repo.create(input);
  }

  get(id: string): Promise<Tenant | null> {
    return this.repo.getById(id);
  }

  update(id: string, input: UpdateTenantInput): Promise<Tenant | null> {
    return this.repo.update(id, input);
  }

  delete(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}
