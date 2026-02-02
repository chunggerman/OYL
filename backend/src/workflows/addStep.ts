
import { Pool } from "pg";
import { randomUUID } from "crypto";

export async function addStep(
  db: Pool,
  workflowId: string,
  stepType: string,
  config: object,
  order: number
) {
  const id = randomUUID();

  await db.query(
    `INSERT INTO workflow_steps (id, workflow_id, step_type, config, step_order, created_at)
     VALUES ($1, $2, $3, $4, $5, NOW())`,
    [id, workflowId, stepType, config, order]
  );

  return { id, stepType, order };
}
