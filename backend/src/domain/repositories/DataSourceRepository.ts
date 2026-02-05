import { PostgresDatasourceRepository } from "../domain/repositories/PostgresDatasourceRepository";

export class DatasourceService {
  private repo: PostgresDatasourceRepository;

  constructor(repo: PostgresDatasourceRepository) {
    this.repo = repo;
  }

  list() {
    return this.repo.list();
  }

  create(data: any) {
    return this.repo.create(data);
  }

  get(id: string) {
    return this.repo.get(id);
  }

  update(id: string, data: any) {
    return this.repo.update(id, data);
  }

  delete(id: string) {
    return this.repo.delete(id);
  }
}
