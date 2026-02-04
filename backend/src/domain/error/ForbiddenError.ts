import { AppError } from "../entities/AppError";

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden", details?: any) {
    super(message, 403, details);
  }
}
