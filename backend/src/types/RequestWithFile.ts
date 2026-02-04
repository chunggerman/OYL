import { Request } from "express";

export interface RequestWithFile extends Request {
  file?: {
    originalname: string;
    buffer: Buffer;
    mimetype?: string;
    size?: number;
  };
  files?: any;
}
