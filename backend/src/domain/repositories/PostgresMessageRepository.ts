import { pool } from "../../db";
import {
  Message,
  CreateMessageInput,
  UpdateMessageInput,
} from "../entities/Message";
import { MessageRepository } from "./MessageRepository";

export class PostgresMessageRepository implements MessageRepository {

  /**
   * Private Mappers
   */
  private mapRow(row: any): Message {
    return {
      id: row.id,
      chatId: row.chat_id,
      role: row.role,
      content: row.content,
      metadata: row.metadata,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  /**
   * Public Repository Methods
   */
  async listByChat(chatId: string): Promise<Message[]> {
    const result = await pool.query(
      "SELECT * FROM messages WHERE chat_id = $1 ORDER BY created_at ASC",
      [chatId]
    );
    return result.rows.map((r) => this.mapRow(r));
  }

  async create(input: CreateMessageInput): Promise<Message> {
    const result = await pool.query(
      "INSERT INTO messages (chat_id, role, content, metadata) VALUES ($1, $2, $3, $4) RETURNING *",
      [input.chatId, input.role, input.content, input.metadata ?? null]
    );
    return this.mapRow(result.rows[0]);
  }

  async getById(id: string): Promise<Message | null> {
    const result = await pool.query(
      "SELECT * FROM messages WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async update(id: string, input: UpdateMessageInput): Promise<Message | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    // Logic: Dynamically build field list for update
    if (input.content !== undefined) {
      fields.push(`content = $${idx}`);
      values.push(input.content);
      idx++;
    }

    if (input.metadata !== undefined) {
      fields.push(`metadata = $${idx}`);
      values.push(input.metadata);
      idx++;
    }

    if (fields.length === 0) {
      return this.getById(id);
    }

    // Add ID as the final parameter for the WHERE clause
    values.push(id);

    const query = `
      UPDATE messages
      SET ${fields.join(", ")}, updated_at = NOW()
      WHERE id = $${idx}
      RETURNING *
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async delete(id: string): Promise<void> {
    await pool.query("DELETE FROM messages WHERE id = $1", [id]);
  }
}
