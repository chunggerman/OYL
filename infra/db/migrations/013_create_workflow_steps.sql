-- File: OYL/infra/db/migrations/013_create_workflow_steps.sql

CREATE TABLE workflow_steps (
  id UUID PRIMARY KEY,
  workflow_id UUID NOT NULL REFERENCES workflows (id),
  position INTEGER NOT NULL,
  type_enum workflow_step_type_enum NOT NULL,
  assistant_id UUID REFERENCES assistants (id),
  instruction TEXT,
  config_json JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_workflow_steps_workflow_id
  ON workflow_steps (workflow_id);

CREATE INDEX idx_workflow_steps_deleted_at
  ON workflow_steps (deleted_at);

CREATE INDEX idx_workflow_steps_workflow_position
  ON workflow_steps (workflow_id, position);
