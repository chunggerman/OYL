import {
  SemanticSearch,
  CreateSemanticSearchInput,
  UpdateSemanticSearchInput,
} from "../domain/entities/SemanticSearch";
import { SemanticSearchRepository } from "../domain/repositories/SemanticSearchRepository";

export class SemanticSearchService {
  constructor(private readonly repo: SemanticSearchRepository) {}

  list(): Promise<SemanticSearch[]> {
    return this.repo.list();
  }

  create(input: CreateSemanticSearchInput): Promise<SemanticSearch> {
    return this.repo.create(input);
  }

  get(id: string): Promise<SemanticSearch | null> {
    return this.repo.getById(id);
  }

  update(id: string, input: UpdateSemanticSearchInput): Promise<SemanticSearch | null> {
    return this.repo.update(id, input);
  }

  delete(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}
