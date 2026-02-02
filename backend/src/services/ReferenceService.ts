import { ReferenceRepository } from "../domain/repositories/ReferenceRepository";
import { Reference } from "../domain/entities/Reference";

export class ReferenceService {
  constructor(private readonly repo: ReferenceRepository) {}

  async getReference(id: string): Promise<Reference | null> {
    return this.repo.findById(id);
  }

  async getByWorkspace(workspaceId: string): Promise<Reference[]> {
    return this.repo.findByWorkspace(workspaceId);
  }

  async createReference(reference: Reference): Promise<void> {
    await this.repo.create(reference);
  }
}
