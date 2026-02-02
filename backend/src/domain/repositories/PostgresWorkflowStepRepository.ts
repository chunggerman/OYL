import { db } from "../../db";
import { WorkflowStep } from "../entities/WorkflowStep";
import { WorkflowStepRepository } from "./WorkflowStepRepository";

export class PostgresWorkflowStepRepository implements WorkflowStepRepository {
  async findById(id: string): Promise<WorkflowStep | null> {
    const result = await db.query(
      `SELECT id, workflow_id, position, type_enum, assistant_id, instruction, config_json, created_at, deleted_at
       FROM workflow_steps
       WHERE id = $1`,
      [id]
    );
    if (result.rowCount === 0) return null;
    const row = result.rows[0];
    return {
      id: row.id,
      workflowId: row.workflow_id,
      position: row.position,
      typeEnum: row.type_enum,
      assistantId: row.assistant_id,
      instruction: row.instruction,
      configJson: row.config_json,
      createdAt: row.created_at,
      deletedAt: row.deleted_at,
    };
  }

  async findByWorkflow(workflowId: string): Promise<WorkflowStep[]> {
    const result = await db.query(
      `SELECT id, workflow_id, position, type_enum, assistant_id, instruction, config_json, created_at, deleted_at
       FROM workflow_steps
       WHERE workflow_id = $1 AND deleted_at IS NULL
       ORDER BY position ASC`,
      [workflowId]
    );
    return result.rows.map((row) => ({
      id: row.id,
      workflowId: row.workflow_id,
      position: row.position,
      typeEnum: row.type_enum,
      assistantId: row.assistant_id,
      instruction: row.instruction,
      configJson: row.config_json,
      createdAt: row.created_at,
      deletedAt: row.deleted_at,
    }));
  }

  async create(step: WorkflowStep): Promise<void> {
    await db.query(
      `INSERT INTO workflow_steps (id, workflow_id, position, type_enum, assistant_id, instruction, config_json, created_at, deleted_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        step.id,
        step.workflowId,
        step.position,
        step.typeEnum,
        step.assistantId,
        step.instruction,
        step.configJson,
        step.createdAt,
        step.deletedAt,
      ]
    );
  }
}
