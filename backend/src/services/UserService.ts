import { PostgresUserRepository } from "../repositories/PostgresUserRepository";

export class UserService {
  private repo: PostgresUserRepository;

  constructor() {
    this.repo = new PostgresUserRepository();
  }

  async list(tenantId: string) {
    return this.repo.listByTenant(tenantId);
  }

  async get(id: string, tenantId: string) {
    return this.repo.getById(id, tenantId);
  }

  async getByEmail(email: string, tenantId: string) {
    return this.repo.getByEmail(email, tenantId);
  }

  async create(
    tenantId: string,
    email: string,
    name: string | null
  ) {
    return this.repo.create(tenantId, email, name);
  }

  async update(
    id: string,
    tenantId: string,
    email: string,
    name: string | null
  ) {
    return this.repo.update(id, tenantId, email, name);
  }

  async delete(id: string, tenantId: string) {
    await this.repo.delete(id, tenantId);
  }
}
