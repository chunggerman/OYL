import { Request, Response, NextFunction } from "express";

export function requestValidationMiddleware(schema: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    next();
  };
}
