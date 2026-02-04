import { pool } from "../db";

export interface TableMetadata {
  schema: string;
  name: string;
}

export interface ColumnMetadata {
  tableSchema: string;
  tableName: string;
  columnName: string;
  dataType: string;
  isNullable: boolean;
}

export class MetadataReaderService {
  async listTables(): Promise<TableMetadata[]> {
    const result = await pool.query(
      `
      SELECT table_schema, table_name
      FROM information_schema.tables
      WHERE table_type = 'BASE TABLE'
        AND table_schema NOT IN ('pg_catalog', 'information_schema')
      ORDER BY table_schema, table_name
      `
    );

    return result.rows.map((row) => ({
      schema: row.table_schema,
      name: row.table_name,
    }));
  }

  async listColumns(params: {
    schema: string;
    table: string;
  }): Promise<ColumnMetadata[]> {
    const result = await pool.query(
      `
      SELECT
        table_schema,
        table_name,
        column_name,
        data_type,
        is_nullable
      FROM information_schema.columns
      WHERE table_schema = $1
        AND table_name = $2
      ORDER BY ordinal_position
      `,
      [params.schema, params.table]
    );

    return result.rows.map((row) => ({
      tableSchema: row.table_schema,
      tableName: row.table_name,
      columnName: row.column_name,
      dataType: row.data_type,
      isNullable: row.is_nullable === "YES",
    }));
  }
}
