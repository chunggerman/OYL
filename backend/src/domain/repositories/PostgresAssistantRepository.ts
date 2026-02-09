import { pool } from "../../db";
import {
  Assistant,
  CreateAssistantInput,
  UpdateAssistantInput,
} from "../../domain/entities/Assistant";
import { AssistantRepository } from "./AssistantRepository";

export class PostgresAssistantRepository implements AssistantRepository {

  /**
   * Private mapper
   */
  private mapRow(row: any): Assistant {
    return {
      id: row.id,
      workspaceId: row.workspace_id,
      name: row.name,
      instruction: row.instruction,
      aiInstruction: row.ai_instruction,
      settingsJson: row.settings_json,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      deletedAt: row.deleted_at,
    };
  }

  /**
   * List assistants by workspace
   */
  async listByWorkspace(workspaceId: string): Promise<Assistant[]> {
    const result = await pool.query(
      `
      SELECT *
      FROM assistants
      WHERE workspace_id = $1
        AND deleted_at IS NULL
      ORDER BY created_at DESC
      `,
      [workspaceId]
    );
    return result.rows.map((r) => this.mapRow(r));
  }

  /**
   * Create assistant
   */
  async create(input: CreateAssistantInput): Promise<Assistant> {
    const result = await pool.query(
      `
      INSERT INTO assistants (workspace_id, name, instruction, ai_instruction, settings_json)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [
        input.workspaceId,
        input.name,
        input.instruction ?? null,
        input.aiInstruction ?? null,
        input.settingsJson ?? null,
      ]
    );
    return this.mapRow(result.rows[0]);
  }

  /**
   * Get by id
   */
  async getById(id: string): Promise<Assistant | null> {
    const result = await pool.query(
      `
      SELECT *
      FROM assistants
      WHERE id = $1
        AND deleted_at IS NULL
      `,
      [id]
    );

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  /**
   * Update assistant
   */
  async update(id: string, input: UpdateAssistantInput): Promise<Assistant | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    // Build dynamic fields for update
    if (input.name !== undefined) {
      fields.push(`name = $${idx}`);
      values.push(input.name);
      idx++;
    }

    if (input.instruction !== undefined) {
      fields.push(`instruction = $${idx}`);
      values.push(input.instruction);
      idx++;
    }

    if (input.aiInstruction !== undefined) {
      fields.push(`ai_instruction = $${idx}`);
      values.push(input.aiInstruction);
      idx++;
    }

    if (input.settingsJson !== undefined) {
      fields.push(`settings_json = $${idx}`);
      values.push(input.settingsJson);
      idx++;
    }

    if (fields.length === 0) {
      return this.getById(id);
    }

    // Add ID to values for the WHERE clause
    values.push(id);

    const query = `
      UPDATE assistants
      SET ${fields.join(", ")}, updated_at = NOW()
      WHERE id = $${idx}
      RETURNING *
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  /**
   * Soft delete
   */
  async delete(id: string): Promise<void> {
    await pool.query(
      "UPDATE assistants SET deleted_at = NOW() WHERE id = $1",
      [id]
    );
  }
}
