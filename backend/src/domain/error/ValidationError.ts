import { AppError } from "../entities/AppError";

export class ValidationError extends AppError {
  constructor(message = "Validation failed", details?: any) {
    super(message, 400, details);
  }
}
