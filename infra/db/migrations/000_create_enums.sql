-- File: OYL/infra/db/migrations/000_create_enums.sql

CREATE TYPE integration_type_enum AS ENUM ('REST', 'SQL');

CREATE TYPE workflow_step_type_enum AS ENUM (
  'ASK_REFERENCE',
  'ASK_DATA',
  'INTEGRATION',
  'HUMAN'
);

CREATE TYPE tag_source_enum AS ENUM ('manual', 'ai');
