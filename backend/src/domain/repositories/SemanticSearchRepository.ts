import {
  SemanticSearch,
  CreateSemanticSearchInput,
  UpdateSemanticSearchInput,
} from "../entities/SemanticSearch";

export interface SemanticSearchRepository {
  list(): Promise<SemanticSearch[]>;
  create(input: CreateSemanticSearchInput): Promise<SemanticSearch>;
  getById(id: string): Promise<SemanticSearch | null>;
  update(id: string, input: UpdateSemanticSearchInput): Promise<SemanticSearch | null>;
  delete(id: string): Promise<void>;
}
