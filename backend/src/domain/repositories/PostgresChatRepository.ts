import { pool } from "../../db";
import {
  Chat,
  CreateChatInput,
  UpdateChatInput,
} from "../entities/Chat";
import { ChatRepository } from "./ChatRepository";

export class PostgresChatRepository implements ChatRepository {

  /**
   * Private Mappers
   */
  private mapRow(row: any): Chat {
    return {
      id: row.id,
      userId: row.user_id,
      title: row.title,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  /**
   * Public Repository Methods
   */
  async listByUser(userId: string): Promise<Chat[]> {
    const result = await pool.query(
      "SELECT * FROM chats WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    return result.rows.map((r) => this.mapRow(r));
  }

  async create(input: CreateChatInput): Promise<Chat> {
    const result = await pool.query(
      "INSERT INTO chats (user_id, title) VALUES ($1, $2) RETURNING *",
      [input.userId, input.title ?? null]
    );
    return this.mapRow(result.rows[0]);
  }

  async getById(id: string): Promise<Chat | null> {
    const result = await pool.query(
      "SELECT * FROM chats WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async update(id: string, input: UpdateChatInput): Promise<Chat | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    // Logic: Dynamically build the field list for the update
    if (input.title !== undefined) {
      fields.push(`title = $${idx}`);
      values.push(input.title);
      idx++;
    }

    if (fields.length === 0) {
      return this.getById(id);
    }

    // Append ID as the final parameter for the WHERE clause
    values.push(id);

    const query = `
      UPDATE chats
      SET ${fields.join(", ")}, updated_at = NOW()
      WHERE id = $${idx}
      RETURNING *
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async delete(id: string): Promise<void> {
    await pool.query("DELETE FROM chats WHERE id = $1", [id]);
  }
}
