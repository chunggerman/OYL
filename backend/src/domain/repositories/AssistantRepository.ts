import { pool } from "../../db";
import { Assistant } from "../entities/Assistant";

export class AssistantRepository {
  async create(
    workspaceId: string,
    name: string,
    instruction: string | null,
    aiInstruction: string | null,
    settingsJson: Record<string, any> | null
  ): Promise<Assistant> {
    const result = await pool.query(
      `
      INSERT INTO assistants (id, workspace_id, name, instruction, ai_instruction, settings_json)
      VALUES (gen_random_uuid(), $1, $2, $3, $4, $5)
      RETURNING id, workspace_id, name, instruction, ai_instruction, settings_json, created_at, updated_at, deleted_at
      `,
      [workspaceId, name, instruction, aiInstruction, settingsJson]
    );
    return this.mapRow(result.rows[0]);
  }

  async findById(id: string): Promise<Assistant | null> {
    const result = await pool.query(
      `
      SELECT id, workspace_id, name, instruction, ai_instruction, settings_json, created_at, updated_at, deleted_at
      FROM assistants
      WHERE id = $1 AND deleted_at IS NULL
      `,
      [id]
    );
    if (result.rowCount === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async listByWorkspace(workspaceId: string): Promise<Assistant[]> {
    const result = await pool.query(
      `
      SELECT id, workspace_id, name, instruction, ai_instruction, settings_json, created_at, updated_at, deleted_at
      FROM assistants
      WHERE workspace_id = $1 AND deleted_at IS NULL
      ORDER BY created_at DESC
      `,
      [workspaceId]
    );
    return result.rows.map((row) => this.mapRow(row));
  }

  async softDelete(id: string): Promise<void> {
    await pool.query(
      `
      UPDATE assistants
      SET deleted_at = NOW()
      WHERE id = $1 AND deleted_at IS NULL
      `,
      [id]
    );
  }

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
}
