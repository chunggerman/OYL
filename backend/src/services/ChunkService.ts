import {
  Chunk,
  CreateChunkInput,
  UpdateChunkInput,
} from "../domain/entities/Chunk";
import { ChunkRepository } from "../domain/repositories/ChunkRepository";

export class ChunkService {
  constructor(private readonly repo: ChunkRepository) {}

  listByDatasource(datasourceId: string): Promise<Chunk[]> {
    return this.repo.listByDatasource(datasourceId);
  }

  create(input: CreateChunkInput): Promise<Chunk> {
    return this.repo.create(input);
  }

  get(id: string): Promise<Chunk | null> {
    return this.repo.getById(id);
  }

  update(id: string, input: UpdateChunkInput): Promise<Chunk | null> {
    return this.repo.update(id, input);
  }

  delete(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}
