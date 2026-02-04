import { AppError } from "../entities/AppError";

export class InternalError extends AppError {
  constructor(message = "Internal server error", details?: any) {
    super(message, 500, details);
  }
}
