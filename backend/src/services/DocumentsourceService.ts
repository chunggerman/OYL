//import { PostgresDocumentsourceRepository } from "../domain/repositories/PostgresDocumentsourceRepository";
import { PostgresDocumentsourceRepository } from "../domain/repositories/PostgresDocumentsourceRepository"
export class DocumentsourceService {
  private repo: PostgresDocumentsourceRepository;

  constructor(repo: PostgresDocumentsourceRepository) {
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
