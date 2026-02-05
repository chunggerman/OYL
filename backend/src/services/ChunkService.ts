import { PostgresChunkRepository } from "../domain/repositories/PostgresChunkRepository";

export class ChunkService {
  private repo: PostgresChunkRepository;

  constructor(repo: PostgresChunkRepository) {
    this.repo = repo;
  }

  list() {
    return this.repo.list();
  }

  listByDatasource(datasourceId: string) {
    return this.repo.listByDatasource(datasourceId);
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
