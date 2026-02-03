import { PostgresTenantRepository } from "../repositories/PostgresTenantRepository";

export class TenantService {
  private repo: PostgresTenantRepository;

  constructor() {
    this.repo = new PostgresTenantRepository();
  }

  async list() {
    return this.repo.list();
  }

  async get(id: string) {
    return this.repo.getById(id);
  }

  async getByDomain(domain: string) {
    return this.repo.getByDomain(domain);
  }

  async create(name: string, domain: string | null) {
    return this.repo.create(name, domain);
  }

  async update(id: string, name: string, domain: string | null) {
    return this.repo.update(id, name, domain);
  }

  async delete(id: string) {
    await this.repo.delete(id);
  }
}
