import {
  Chunk,
  CreateChunkInput,
  UpdateChunkInput,
} from "../entities/Chunk";

export interface ChunkRepository {
  listByDatasource(datasourceId: string): Promise<Chunk[]>;
  create(input: CreateChunkInput): Promise<Chunk>;
  getById(id: string): Promise<Chunk | null>;
  update(id: string, input: UpdateChunkInput): Promise<Chunk | null>;
  delete(id: string): Promise<void>;
}
