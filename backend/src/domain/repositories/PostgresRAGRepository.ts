import { pool } from "../../db";
import {
  RAG,
  CreateRAGInput,
  UpdateRAGInput,
} from "../entities/RAG";
import { RAGRepository } from "./RAGRepository";

export class PostgresRAGRepository implements RAGRepository {

  /**
   * Private Mappers
   */
  private mapRow(row: any): RAG {
    return {
      id: row.id,
      chatId: row.chat_id,
      messageId: row.message_id,
      query: row.query,
      retrievedChunkIds: row.retrieved_chunk_ids,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  /**
   * Public Repository Methods
   */
  async listByChat(chatId: string): Promise<RAG[]> {
    const result = await pool.query(
      "SELECT * FROM rag WHERE chat_id = $1 ORDER BY created_at DESC",
      [chatId]
    );
    return result.rows.map((r) => this.mapRow(r));
  }

  async listByMessage(messageId: string): Promise<RAG[]> {
    const result = await pool.query(
      "SELECT * FROM rag WHERE message_id = $1 ORDER BY created_at DESC",
      [messageId]
    );
    return result.rows.map((r) => this.mapRow(r));
  }

  async create(input: CreateRAGInput): Promise<RAG> {
    const result = await pool.query(
      "INSERT INTO rag (chat_id, message_id, query, retrieved_chunk_ids) VALUES ($1, $2, $3, $4) RETURNING *",
      [
        input.chatId ?? null,
        input.messageId ?? null,
        input.query,
        input.retrievedChunkIds,
      ]
    );
    return this.mapRow(result.rows[0]);
  }

  async getById(id: string): Promise<RAG | null> {
    const result = await pool.query(
      "SELECT * FROM rag WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async update(id: string, input: UpdateRAGInput): Promise<RAG | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    // Build dynamic fields for the update query
    if (input.query !== undefined) {
      fields.push(`query = $${idx}`);
      values.push(input.query);
      idx++;
    }

    if (input.retrievedChunkIds !== undefined) {
      fields.push(`retrieved_chunk_ids = $${idx}`);
      values.push(input.retrievedChunkIds);
      idx++;
    }

    if (fields.length === 0) {
      return this.getById(id);
    }

    // Add ID to values and target the correct index in the WHERE clause
    values.push(id);

    const query = `
      UPDATE rag
      SET ${fields.join(", ")}, updated_at = NOW()
      WHERE id = $${idx}
      RETURNING *
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async delete(id: string): Promise<void> {
    await pool.query("DELETE FROM rag WHERE id = $1", [id]);
  }
}
