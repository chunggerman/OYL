import {
  Reference,
  CreateReferenceInput,
  UpdateReferenceInput,
} from "../domain/entities/Reference";
import { ReferenceRepository } from "../domain/repositories/ReferenceRepository";

export class ReferenceService {
  constructor(private readonly repo: ReferenceRepository) {}

  listByChunk(chunkId: string): Promise<Reference[]> {
    return this.repo.listByChunk(chunkId);
  }

  create(input: CreateReferenceInput): Promise<Reference> {
    return this.repo.create(input);
  }

  get(id: string): Promise<Reference | null> {
    return this.repo.getById(id);
  }

  update(id: string, input: UpdateReferenceInput): Promise<Reference | null> {
    return this.repo.update(id, input);
  }

  delete(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}
