import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';

export async function authToken(req: Request, res: Response, next: NextFunction): Promise<void> {
  // Try to get token from cookie first, then from Authorization header (Bearer)
  let token = req.cookies?.accessToken;

  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Usuario sin token' });
    return;
  }

  try {
    const data = jwt.verify(token, env.jwt.accessSecret);
    req.user = data as any;
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido' });
  }
}
