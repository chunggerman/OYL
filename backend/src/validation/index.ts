export class ValidationError extends Error {
  status = 400;
  details: any;

  constructor(message: string, details?: any) {
    super(message);
    this.details = details;
  }
}

export function requireString(value: any, field: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new ValidationError(`Invalid or missing field: ${field}`);
  }
  return value;
}

export function optionalString(value: any, field: string): string | null {
  if (value === undefined || value === null) return null;
  if (typeof value !== "string") {
    throw new ValidationError(`Invalid field: ${field}`);
  }
  return value;
}

export function requireNumber(value: any, field: string): number {
  if (typeof value !== "number" || Number.isNaN(value)) {
    throw new ValidationError(`Invalid or missing field: ${field}`);
  }
  return value;
}

export function optionalNumber(value: any, field: string): number | null {
  if (value === undefined || value === null) return null;
  if (typeof value !== "number" || Number.isNaN(value)) {
    throw new ValidationError(`Invalid field: ${field}`);
  }
  return value;
}

export function optionalObject(value: any, field: string): any | null {
  if (value === undefined || value === null) return null;
  if (typeof value !== "object" || Array.isArray(value)) {
    throw new ValidationError(`Invalid field: ${field}`);
  }
  return value;
}

export function requireArray(value: any, field: string): any[] {
  if (!Array.isArray(value)) {
    throw new ValidationError(`Invalid or missing field: ${field}`);
  }
  return value;
}
