import { PostgresUserRepository } from "../domain/repositories/PostgresUserRepository";

export class UserService {
  private repo: PostgresUserRepository;

  constructor() {
    this.repo = new PostgresUserRepository();
  }

  async list(tenantId: string) {
    return this.repo.list(tenantId);
  }

  async get(id: string, tenantId: string) {
    return this.repo.get(id, tenantId);
  }

  async create(email: string, name: string | null, tenantId: string) {
    return this.repo.create(email, name, tenantId);
  }

  async update(id: string, email: string, name: string | null, tenantId: string) {
    return this.repo.update(id, email, name, tenantId);
  }

  async delete(id: string, tenantId: string) {
    return this.repo.delete(id, tenantId);
  }
}
