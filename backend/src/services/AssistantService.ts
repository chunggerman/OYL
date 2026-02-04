import {
  Assistant,
  CreateAssistantInput,
  UpdateAssistantInput,
} from "../domain/entities/Assistant";
import { AssistantRepository } from "../domain/repositories/AssistantRepository";

export class AssistantService {
  constructor(private readonly repo: AssistantRepository) {}

  list(): Promise<Assistant[]> {
    return this.repo.list();
  }

  create(input: CreateAssistantInput): Promise<Assistant> {
    return this.repo.create(input);
  }

  get(id: string): Promise<Assistant | null> {
    return this.repo.getById(id);
  }

  update(id: string, input: UpdateAssistantInput): Promise<Assistant | null> {
    return this.repo.update(id, input);
  }

  delete(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}
