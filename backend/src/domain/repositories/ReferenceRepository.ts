import { Reference } from "../entities/Reference";

export interface ReferenceRepository {
  findById(id: string): Promise<Reference | null>;
  findByWorkspace(workspaceId: string): Promise<Reference[]>;
  create(reference: Reference): Promise<void>;
}
