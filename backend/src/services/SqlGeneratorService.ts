import { ColumnMetadata } from "./MetadataReaderService";

export class SqlGeneratorService {
  generateSelect(params: {
    schema: string;
    table: string;
    columns: ColumnMetadata[];
    limit?: number;
  }): string {
    const cols =
      params.columns.length > 0
        ? params.columns.map((c) => `"${c.columnName}"`).join(", ")
        : "*";

    const limit = params.limit ?? 100;

    return `SELECT ${cols} FROM "${params.schema}"."${params.table}" LIMIT ${limit}`;
  }
}
