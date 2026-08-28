import { Request, Response, NextFunction } from 'express';
import authService from '../services/auth.service';

export const getCaptcha = async (_req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const captcha = await authService.getCaptcha();
  res.status(200).json(captcha);
};

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const dto = req.body;
    const result = await authService.register(dto);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const activateAccount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { token } = req.body;
    const result = await authService.activateAccount(token);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
