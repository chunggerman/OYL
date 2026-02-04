import {
  Reference,
  CreateReferenceInput,
  UpdateReferenceInput,
} from "../entities/Reference";

export interface ReferenceRepository {
  listByChunk(chunkId: string): Promise<Reference[]>;
  create(input: CreateReferenceInput): Promise<Reference>;
  getById(id: string): Promise<Reference | null>;
  update(id: string, input: UpdateReferenceInput): Promise<Reference | null>;
  delete(id: string): Promise<void>;
}
