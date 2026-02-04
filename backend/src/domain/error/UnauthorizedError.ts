import { AppError } from "../entities/AppError";

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized", details?: any) {
    super(message, 401, details);
  }
}
