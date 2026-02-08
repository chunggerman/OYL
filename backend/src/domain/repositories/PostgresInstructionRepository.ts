import { pool } from "../../db";
import { Instruction } from "../entities/Instruction";
import { InstructionRepository } from "./InstructionRepository";

export class PostgresInstructionRepository implements InstructionRepository {

  /**
   * Private Mappers
   */
  private mapRow(row: any): Instruction {
    return {
      id: row.id,
      workspaceId: row.workspace_id,
      name: row.name,
      content: row.content,
      refinedContent: row.refined_content,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      deletedAt: row.deleted_at,
    };
  }

  /**
   * Public Repository Methods
   */
  async create(data: {
    workspaceId: string;
    name: string;
    content: string;
  }): Promise<Instruction> {
    const result = await pool.query(
      `
      INSERT INTO instructions (workspace_id, name, content)
      VALUES ($1, $2, $3)
      RETURNING
        id,
        workspace_id,
        name,
        content,
        refined_content,
        created_at,
        updated_at,
        deleted_at
      `,
      [data.workspaceId, data.name, data.content]
    );

    return this.mapRow(result.rows[0]);
  }

  async getById(id: string): Promise<Instruction | null> {
    const result = await pool.query(
      `
      SELECT
        id,
        workspace_id,
        name,
        content,
        refined_content,
        created_at,
        updated_at,
        deleted_at
      FROM instructions
      WHERE id = $1
        AND deleted_at IS NULL
      `,
      [id]
    );

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async listByWorkspace(workspaceId: string): Promise<Instruction[]> {
    const result = await pool.query(
      `
      SELECT
        id,
        workspace_id,
        name,
        content,
        refined_content,
        created_at,
        updated_at,
        deleted_at
      FROM instructions
      WHERE workspace_id = $1
        AND deleted_at IS NULL
      ORDER BY created_at ASC
      `,
      [workspaceId]
    );

    return result.rows.map((row: any) => this.mapRow(row));
  }

  async update(
    id: string,
    data: Partial<{
      name: string;
      content: string;
      refinedContent: string | null;
    }>
  ): Promise<Instruction | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    // Logic: Dynamically build fields for update
    if (data.name !== undefined) {
      fields.push(`name = $${idx++}`);
      values.push(data.name);
    }
    if (data.content !== undefined) {
      fields.push(`content = $${idx++}`);
      values.push(data.content);
    }
    if (data.refinedContent !== undefined) {
      fields.push(`refined_content = $${idx++}`);
      values.push(data.refinedContent);
    }

    if (fields.length === 0) {
      return this.getById(id);
    }

    // Add ID to values for the WHERE clause
    values.push(id);

    const query = `
      UPDATE instructions
      SET ${fields.join(", ")}, updated_at = NOW()
      WHERE id = $${idx} AND deleted_at IS NULL
      RETURNING
        id,
        workspace_id,
        name,
        content,
        refined_content,
        created_at,
        updated_at,
        deleted_at
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async softDelete(id: string): Promise<void> {
    await pool.query(
      "UPDATE instructions SET deleted_at = NOW() WHERE id = $1 AND deleted_at IS NULL",
      [id]
    );
  }

  async linkToAssistant(
    assistantId: string,
    instructionId: string
  ): Promise<void> {
    await pool.query(
      "INSERT INTO assistant_instructions (assistant_id, instruction_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
      [assistantId, instructionId]
    );
  }
}
