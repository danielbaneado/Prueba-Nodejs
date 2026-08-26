import { JwtPayload } from 'jsonwebtoken';

export type AuthPayload = JwtPayload & {
  role?: string;
  id?: number,
  name?: string,
};

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export {};

