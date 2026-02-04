import { MetadataReaderService } from "./MetadataReaderService";
import { SqlGeneratorService } from "./SqlGeneratorService";
import { SqlValidatorService } from "./SqlValidatorService";
import { SqlExecutorService } from "./SqlExecutorService";
import { LlmClient } from "./LlmClient";

export class AskForDataSqlOrchestrator {
  private metadata: MetadataReaderService;
  private generator: SqlGeneratorService;
  private validator: SqlValidatorService;
  private executor: SqlExecutorService;
  private llm: LlmClient;

  constructor(llm: LlmClient) {
    this.metadata = new MetadataReaderService();
    this.generator = new SqlGeneratorService();
    this.validator = new SqlValidatorService();
    this.executor = new SqlExecutorService();
    this.llm = llm;
  }

  async generateSqlFromQuestion(params: {
    workspaceId: string;
    question: string;
  }): Promise<{
    sql: string;
    valid: boolean;
    reason?: string;
    rows?: any[];
    rowCount?: number;
  }> {
    const tables = await this.metadata.listTables();

    const schemaDescription = tables
      .map((t) => `${t.schema}.${t.name}`)
      .join("\n");

    const prompt = `
You generate safe SQL SELECT queries.

Database tables:
${schemaDescription}

User question:
${params.question}

Rules:
- Only output a single SELECT statement.
- No comments.
- No DDL.
- No writes.
- No semicolons.
Return ONLY the SQL.
`;

    const completion = await this.llm.complete({
      model: "gpt-4.1-mini",
      prompt,
      temperature: 0.1,
      maxTokens: 256,
    });

    const sql = completion.completion.trim();
    const validation = this.validator.validate(sql);

    if (!validation.valid) {
      return {
        sql,
        valid: false,
        reason: validation.reason,
      };
    }

    const result = await this.executor.execute(sql);

    return {
      sql,
      valid: true,
      rows: result.rows,
      rowCount: result.rowCount,
    };
  }
}
