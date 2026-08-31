import { Request, Response, NextFunction } from 'express';
import errorHandler from './errorHandler';

export function centralizedErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): Response {
  console.error('Error no manejado:', err);

  if (err instanceof errorHandler) {
    return res.status(err.estado).json({ error: err.message });
  }

  return res.status(500).json({ error: 'Error interno del servidor' });
}
