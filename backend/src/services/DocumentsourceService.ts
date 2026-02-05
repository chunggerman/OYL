//import { PostgresDocumentsourceRepository } from "../domain/repositories/PostgresDocumentsourceRepository";
import { PostgresDocumentSourceRepository } from "../domain/repositories/PostgresDocumentSourceRepository"
export class DocumentsourceService {
  private repo: PostgresDocumentSourceRepository;

  constructor(repo: PostgresDocumentSourceRepository) {
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
