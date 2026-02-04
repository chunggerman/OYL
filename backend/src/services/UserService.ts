import {
  User,
  CreateUserInput,
  UpdateUserInput,
} from "../domain/entities/User";
import { UserRepository } from "../domain/repositories/UserRepository";

export class UserService {
  constructor(private readonly repo: UserRepository) {}

  list(): Promise<User[]> {
    return this.repo.list();
  }

  create(input: CreateUserInput): Promise<User> {
    return this.repo.create(input);
  }

  get(id: string): Promise<User | null> {
    return this.repo.getById(id);
  }

  getByEmail(email: string): Promise<User | null> {
    return this.repo.getByEmail(email);
  }

  update(id: string, input: UpdateUserInput): Promise<User | null> {
    return this.repo.update(id, input);
  }

  delete(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}
