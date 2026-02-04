export class SqlValidatorService {
  validate(sql: string): { valid: boolean; reason?: string } {
    const trimmed = sql.trim();

    if (!/^select/i.test(trimmed)) {
      return { valid: false, reason: "Only SELECT statements are allowed" };
    }

    if (trimmed.includes(";")) {
      return { valid: false, reason: "Multiple statements are not allowed" };
    }

    const forbidden = [
      "insert ",
      "update ",
      "delete ",
      "drop ",
      "alter ",
      "truncate ",
      "create ",
      "grant ",
      "revoke ",
      "execute ",
      "call ",
      "copy ",
    ];

    const lower = trimmed.toLowerCase();
    for (const keyword of forbidden) {
      if (lower.includes(keyword)) {
        return { valid: false, reason: `Forbidden keyword detected: ${keyword}` };
      }
    }

    return { valid: true };
  }
}
