import { pool } from "../../db";
import {
  User,
  CreateUserInput,
  UpdateUserInput,
} from "../entities/User";
import { UserRepository } from "./UserRepository";

export class PostgresUserRepository implements UserRepository {

  /**
   * Private Mappers
   */
  private mapRow(row: any): User {
    return {
      id: row.id,
      email: row.email,
      name: row.name,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  /**
   * Public Repository Methods
   */
  async list(): Promise<User[]> {
    const result = await pool.query(
      "SELECT * FROM users ORDER BY created_at DESC"
    );
    return result.rows.map((r) => this.mapRow(r));
  }

  async getById(id: string): Promise<User | null> {
    const result = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async getByEmail(email: string): Promise<User | null> {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async create(input: CreateUserInput): Promise<User> {
    const result = await pool.query(
      "INSERT INTO users (email, name) VALUES ($1, $2) RETURNING *",
      [input.email, input.name ?? null]
    );
    return this.mapRow(result.rows[0]);
  }

  async update(id: string, input: UpdateUserInput): Promise<User | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    // Build dynamic fields for the update query
    if (input.email !== undefined) {
      fields.push(`email = $${idx}`);
      values.push(input.email);
      idx++;
    }

    if (input.name !== undefined) {
      fields.push(`name = $${idx}`);
      values.push(input.name);
      idx++;
    }

    if (fields.length === 0) {
      return this.getById(id);
    }

    // Add ID to values and target the correct index in the WHERE clause
    values.push(id);

    const query = `
      UPDATE users
      SET ${fields.join(", ")}, updated_at = NOW()
      WHERE id = $${idx}
      RETURNING *
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async delete(id: string): Promise<void> {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
  }
}
