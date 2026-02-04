declare module "express-serve-static-core" {
  interface Request {
    file?: {
      originalname: string;
      buffer: Buffer;
      mimetype?: string;
      size?: number;
    };
    files?: any;
  }
}
