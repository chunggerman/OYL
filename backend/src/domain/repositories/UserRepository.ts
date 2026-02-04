import {
  User,
  CreateUserInput,
  UpdateUserInput,
} from "../entities/User";

export interface UserRepository {
  list(): Promise<User[]>;
  create(input: CreateUserInput): Promise<User>;
  getById(id: string): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
  update(id: string, input: UpdateUserInput): Promise<User | null>;
  delete(id: string): Promise<void>;
}
