import { Request, Response, NextFunction } from "express";

const limits = new Map<string, number>();

export function rateLimitMiddleware(req: Request, res: Response, next: NextFunction) {
  const key = req.user?.id || "anon";
  const now = Date.now();

  const last = limits.get(key) || 0;

  if (now - last < 200) {
    return res.status(429).json({ error: "Rate limit exceeded" });
  }

  limits.set(key, now);
  next();
}
